const express = require('express');
const amazon = require('amazon-product-api');
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
module.exports = router;