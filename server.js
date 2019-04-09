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


app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/table', (req, res) => {
  let itemPromises = [];

  for (let item of items) {
    console.log(item)
    itemPromises.push(
      axios.get('https://api.poe.watch/item?id=' + item.id)
        .then(response => doSomethingWithItemData(item, response.data))
        .catch(err => console.log(err))
    );
  }

  Promise.all(itemPromises).then(items => res.send(items));
});

const doSomethingWithItemData = (item, data) => {
  // STU TODO: add appropriate fields into item from data
  return item;
}


app.listen(3000, () => {
  console.log(`app is running on port 3000`);
})