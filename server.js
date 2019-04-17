let tableEntries = require('./items').tableEntries;
let cardIdToIndex = require('./items').cardIdToIndex;

const express = require('express');
const rateLimit = require('express-rate-limit');
const axios = require('axios');
const cors = require('cors');
const cache = require('./cache');

const app = express();
app.use(cors());

// rate limiter
const limiter = rateLimit({
  windowMs: 1000, // 1 sec
  max: 10 // limit each IP to 10 requests per windowMs
});
//  apply to all requests
app.use(limiter);

init = () => {
  if (Object.entries(cardIdToIndex).length === 0) {
    buildCardIdToIndexDictionary();
  }
  getItemData();
}

// build a dictionary of cardId to index into tableEntries
buildCardIdToIndexDictionary = () => {
  for (let i = 0; i < tableEntries.length; i++) {
    var entry = tableEntries[i];
    cardIdToIndex[entry.cardId] = i;
    cardIdToIndex[entry.itemId] = i;
  }
}

getItemData = () => {
  // need to get exchange rate
  axios.get("https://api.poe.watch/compact?league=Synthesis")
    .then(res => handleItemData(res.data))
    .catch(err => console.log(err))
}

handleItemData = (items) => {
  const exaltedOrbPrice = getExaltedOrbPrice(items);
  
  for (let i = 0; i < items.length; i++) {
    var lookupId = items[i].id;
    var tableEntriesIndex = cardIdToIndex[lookupId];
    if (tableEntriesIndex) {
      var entry = tableEntries[tableEntriesIndex];
      if (lookupId == entry.cardId) {
        entry.cardPriceCh = items[i].median;
      }
      else {
        entry.itemPriceCh = items[i].median;
      }
    }
  }
}

getExaltedOrbPrice = (items) => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === 142) {
      return items[i].median;
    }
  }
}

// app.get('/table', cache.get, (req, res) => {
//   let itemPromises = [];

//   axios.get('https://api.poe.watch/item?id=142')
//     .then(response => {
//       exchangeRate = Math.floor(response.data.data[0].mean);

//       for (let item of items) {

//         // 3x exalted orbs has the ID -1
//         // need only the card data for this
//         // can hardcode the itemPriceCh using exchangeRate and itemPriceEx
//         // 2x exalted orbs has the ID -2
//         // 3x annulment orbs has the ID -3
//         // need to do api call to get value of Orb Of Annulment
//         if (item.id < 0) continue;
//         itemPromises.push(
//           axios.get('https://api.poe.watch/item?id=' + item.id)
//             .then(response => getCardData(item, response.data))
//             .catch(err => console.log(err))
//         );
//       }
//       Promise.all(itemPromises).then(items => {
//         cache.set(req, items);
//         res.send(items)
//       });
//     })
//     .catch(err => console.log(err))
// });

// const getCardData = (item, itemData) => {
//   return axios.get('https://api.poe.watch/item?id=' + item.cardId)
//     .then(response => populateItemObject(item, itemData, response.data))
//     .catch(err => console.log(err));
// }

// const populateItemObject = (item, itemData, cardData) => {
//   item.stack = cardData.stack;
//   item.cardPriceCh = cardData.data[0].median;
//   item.cardPriceEx = cardData.data[0].median / exchangeRate;
//   item.stackPriceCh = cardData.stack * item.cardPriceCh;
//   item.stackPriceEx = cardData.stack * item.cardPriceEx;
//   item.itemPriceCh = itemData.data[0].median;
//   item.itemPriceEx = itemData.data[0].median / exchangeRate;
//   item.profitCh = item.itemPriceCh - item.stackPriceCh;
//   item.profitEx = item.itemPriceEx - item.stackPriceEx;
//   item.margin = 100 * item.profitCh / item.itemPriceCh;
//   return item;
// }

app.get('/', (req, res) => {
  res.send('hello world');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
  init();
})