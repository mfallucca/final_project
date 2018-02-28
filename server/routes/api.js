const express = require('express');
const amazon = require('amazon-product-api');
const walmartKey = "ykcpq79ch9tq6pews4mtxx9u"
const walmart = require('walmart')(walmartKey);
const client = amazon.createClient({
  awsId: "AKIAI2DDSRFYAR4GCWRQ",
  awsSecret: "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",
  awsTag: "mfallucca-20"
});
const router = new express.Router();
router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message.",
    // user values passed through from auth middleware
    user: req.user
  });
  // console.log(req.user)
});
router.get('/amazon/:upc', (req, res) => {
  // console.log(res)
  var upc = req.params.upc;
  client.itemLookup({
    idType: 'UPC',
    itemId: upc,
    responseGroup: 'ItemAttributes,Offers,Images'
  }).then(function(results) {
    console.log(results[0].MediumImage[0].URL[0])
    res.status(200).json({
      url: results[0].DetailPageURL[0],
      medimage: results[0].MediumImage[0].URL[0],
      title: results[0].ItemAttributes[0].Title[0]
    });
  }).catch(function(err) {
    console.log(err);
  });
})

router.get('/walmart/:search', (req, res) => {
  var search = req.params.search;
  const resultsArray = []
  walmart.search(search).then(function(results) {
    resultsArray.push(results);
    res.status(200).json({
      queryResults: resultsArray
    });
    console.log(results)
  })

})

module.exports = router;




// let searchItem = 'external hard drive'
// const resultsArray = []
// walmart.search(searchItem).then(function(items) {
//     resultsArray.push(items);
//     console.log(JSON.stringify(resultsArray, null, 2));
// });