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

let exaltedPrice;
let highestId = 1;

init = () => {
  if (Object.entries(cardIdToIndex).length === 0) {
    buildCardIdToIndexDictionary();
    console.log("dictionary built");
  }
  getItemData()
    .then(res => {
      console.log("got item data");
      getStacks();
    })
    .then(res => console.log("initialized"));
}

// build a dictionary of cardId to array of indices into tableEntries.
// some table entries have the same item or card as another entry.
// store the highest id so that we don't have to iterate the entire items list in the api response
buildCardIdToIndexDictionary = () => {
  for (let i = 0; i < tableEntries.length; i++) {
    var entry = tableEntries[i];

    if (!cardIdToIndex[entry.cardId]) {
      cardIdToIndex[entry.cardId] = [];
    }
    cardIdToIndex[entry.cardId].push(i);

    if (!cardIdToIndex[entry.itemId]) {
      cardIdToIndex[entry.itemId] = [];
    }
    cardIdToIndex[entry.itemId].push(i);

    if (entry.cardId > highestId) {
      highestId = entry.cardId;
    }
    if (entry.itemId > highestId) {
      highestId = entry.itemId;
    }
  }
}

getItemData = () => {
  return axios.get("https://api.poe.watch/compact?league=Synthesis")
    .then(res => handleItemData(res.data))
    .catch(err => console.log(err))
}

handleItemData = (items) => {
  setExaltedPrice(items);
  for (let i = 0; i < items.length; i++) {
    var lookupId = items[i].id;
    var tableEntryIndices = cardIdToIndex[lookupId];

    if (tableEntryIndices) {
      for (let index of tableEntryIndices) {
        let entry = tableEntries[index];
        if (lookupId == entry.cardId) {
          entry.cardPriceCh = items[i].median;
        }
        else {
          entry.itemPriceCh = items[i].median;
        }
      }
    }
    if (lookupId === highestId) {
      break;
    }
  }
  return true;
}

setExaltedPrice = (items) => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === 142) {
      exaltedPrice = items[i].median;
      return;
    }
  }
  console.log("couldn't find exalted in item data!");
}

getStacks = () => {
  return axios.get("https://api.poe.watch/itemdata")
    .then(res => handleStackData(res.data))
    .catch(err => console.log(err))
}

handleStackData = (items) => {
  for (let i = 0; i < items.length; i++) {
    var lookupId = items[i].id;
    var tableEntryIndices = cardIdToIndex[lookupId];
    if (tableEntryIndices) {
      for (let index of tableEntryIndices) {
        let entry = tableEntries[index];
        if (lookupId == entry.cardId) {
          entry.stack = items[i].stack;
        }
      }
    }
  }
}

app.get('/table', cache.get, (req, res) => {
  getItemData().then(() => {
    const response = {
      tableEntries: tableEntries,
      exaltedPrice: exaltedPrice
    }
    cache.set(req, response);
    res.send(response);
  })
});

app.get('/', (req, res) => {
  res.send('hello world');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
  init();
})