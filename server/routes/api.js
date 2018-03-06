const express = require('express');
const amazon = require('amazon-product-api');
var Ebay = require('ebay')
var ebay = new Ebay({
  app_id: 'MatthewF-finalpro-PRD-de44c9784-2b97810c'
})
const walmartKey = "ykcpq79ch9tq6pews4mtxx9u";
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
  let upc = req.params.upc;

  client.itemLookup({
    idType: 'UPC',
    itemId: upc,
    responseGroup: 'ItemAttributes,Offers,Images'
  }).then(function(results) {
    // console.log(results[0])
    res.status(200).json({
      url: results[0].DetailPageURL[0],
      medimage: results[0].MediumImage[0].URL[0],
      title: results[0].ItemAttributes[0].Title[0],
      newprice: results[0].OfferSummary[0].LowestNewPrice[0].FormattedPrice[0]
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
  })

})

router.get('/ebay/:upc', (req, res) => {
let upc = req.params.upc;
let params = {
  'OPERATION-NAME': 'findItemsAdvanced', 
  'keywords': upc,
  'sortOrder': 'PricePlusShippingLowest'
};

ebay.get('finding', params, function (err, data) {
  if(err) throw err;
  if (data && data.findItemsAdvancedResponse[0] && data.findItemsAdvancedResponse[0].searchResult[0] && data.findItemsAdvancedResponse[0].searchResult[0].item[0] && data.findItemsAdvancedResponse[0].searchResult[0].item[0].galleryURL[0] && data.findItemsAdvancedResponse[0].searchResult[0].item[0].sellingStatus[0].convertedCurrentPrice[0] && data.findItemsAdvancedResponse[0].searchResult[0].item[0].shippingInfo[0].shippingServiceCost[0] && data.findItemsAdvancedResponse[0].searchResult[0].item[0].viewItemURL[0]) {
    res.status(200).json({
      ebayTitle: data.findItemsAdvancedResponse[0].searchResult[0].item[0].title[0],
      ebayImage: data.findItemsAdvancedResponse[0].searchResult[0].item[0].galleryURL[0],
      ebayPrice: data.findItemsAdvancedResponse[0].searchResult[0].item[0].sellingStatus[0].convertedCurrentPrice[0].__value__,
      ebayShipping: data.findItemsAdvancedResponse[0].searchResult[0].item[0].shippingInfo[0].shippingServiceCost[0].__value__,
      ebayURL: data.findItemsAdvancedResponse[0].searchResult[0].item[0].viewItemURL[0]
    });
  }
});
});
// router.get('/ebay/:upc', (req, res) => {
//   var search = 
// })


// http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=MatthewF-finalpro-PRD-de44c9784-2b97810c&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&globalId=EBAY-US&keywords=633472002908&sortOrder=PricePlusShippingLowest

module.exports = router;




// let searchItem = 'external hard drive'
// const resultsArray = []
// walmart.search(searchItem).then(function(items) {
//     resultsArray.push(items);
//     console.log(JSON.stringify(resultsArray, null, 2));
// });