let itemCardTableEntries = require('./items').itemCardTableEntries;
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

let exchangeRate;

app.get('/', (req, res) => {
  if (Object.entries(cardIdToIndex).length === 0) {
    buildItemIdList();
  }
  getItemData();
  res.send('hello world');
});

// https://api.poe.watch/compact?league=Synthesis gets us all the items and their prices
// for each item in the response, see if the item id matches a cardId in our itemCardTableEntries
// to do this - use the response item id to lookup in cardIdToIndex to find the index into our itemCardTableEntries

// build a dictionary of cardId to index into our itemCardTableEntries
const buildItemIdList = () => {
  for (let i = 0; i < itemCardTableEntries.length; i++) {
    var entry = itemCardTableEntries[i];
    cardIdToIndex[entry.cardId] = i;
    cardIdToIndex[entry.itemId] = i;
  }
}

const getItemData = () => {
  axios.get("https://api.poe.watch/compact?league=Synthesis")
    .then(res => {
      for (let i = 0; i < res.data.length; i++) {
        var lookupId = res.data[i].id;
        var tableEntriesIndex = cardIdToIndex[lookupId];
        if (tableEntriesIndex) {
          var entry = itemCardTableEntries[tableEntriesIndex];

          if (lookupId == entry.cardId) {
            entry.cardPriceCh = res.data[i].median;
          }
          else {
            entry.itemPriceCh = res.data[i].median;
          }
          
        }
      }
      console.log(itemCardTableEntries);
    })
    .catch(err => console.log(err))

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
})