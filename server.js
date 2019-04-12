let items = require('./items');
const express = require('express');
const rateLimit = require('express-rate-limit');
const axios = require('axios');

const app = express();

// rate limiter
const limiter = rateLimit({
  windowMs: 1000, // 1 sec
  max: 10 // limit each IP to 10 requests per windowMs
});
//  apply to all requests
app.use(limiter);

let exchangeRate;

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/table', (req, res) => {
  let itemPromises = [];

  axios.get('https://api.poe.watch/item?id=142')
    .then(response => {
      exchangeRate = Math.floor(response.data.data[0].mean);
      
      for (let item of items) {
        itemPromises.push(
          axios.get('https://api.poe.watch/item?id=' + item.id)
            .then(response => getCardData(item, response.data))
            .catch(err => console.log(err))
        );
      }
    })
    .catch(err => console.log(err))

  Promise.all(itemPromises).then(items => res.send(items));
});

const getCardData = (item, itemData) => {
  axios.get('https://api.poe.watch/item?id=' + item.cardId)
    .then(response => populateItemObject(item, itemData, response.data))
    .catch(err => console.log(err));
}

const populateItemObject = (item, itemData, cardData) => {
  item.stack = cardData.stack;
  item.cardPriceCh = cardData.data[0].median;
  item.cardPriceEx = cardData.data[0].median / exchangeRate;
  item.stackPriceCh = cardData.stack * item.cardPriceCh;
  item.stackPriceEx = cardData.stack * item.cardPriceEx;
  item.itemPriceCh = itemData.data[0].median;
  item.itemPriceEx = itemData.data[0].median / exchangeRate;
  item.profitCh = item.itemPriceCh - item.stackPriceCh;
  item.profitEx = item.itemPriceEx - item.stackPriceEx;
  item.margin = 100 * item.profitCh / item.itemPriceCh;

  console.log(item); 

  
  return item;
}


app.listen(3000, () => {
  console.log(`app is running on port 3000`);
})