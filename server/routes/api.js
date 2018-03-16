const express = require('express');
const db = require('mongoose').model('User');
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
});

// Amazon API route, takes UPC as a parameter

router.get('/amazon/:upc', (req, res) => {
  let upc = req.params.upc;

  client.itemLookup({
    idType: 'UPC',
    itemId: upc,
    responseGroup: 'ItemAttributes,Offers,Images'
  }).then(function(results) {
    if (results && results[0].DetailPageURL && results[0].MediumImage && results[0].ItemAttributes && results[0].OfferSummary && results[0].MediumImage[0].URL && results[0].ItemAttributes[0].Title && results[0].OfferSummary[0].LowestNewPrice && results[0].OfferSummary[0].LowestNewPrice[0].FormattedPrice) {
    res.status(200).json({
      url: results[0].DetailPageURL[0],
      medimage: results[0].MediumImage[0].URL[0],
      title: results[0].ItemAttributes[0].Title[0],
      newprice: results[0].OfferSummary[0].LowestNewPrice[0].FormattedPrice[0]
    });
  }
  else {
    res.status(200).json({
      url: '',
      medimage: '',
      title: '',
      newprice: ''
    });
  }
  }).catch(function(err) {
    console.log(err[0].Error[0].Message);
      res.status(200).json({
        url: '',
        medimage: '',
        title: '',
        newprice: ''
      });
  });
})

// Walmart API route, takes search term as a parameter

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

// Ebay API route, takes UPC as a parameter
// I removed the ebayobject, though we may need to add it for error handling

router.get('/ebay/:upc', (req, res) => {
  let upc = req.params.upc;
  let params = {
    'OPERATION-NAME': 'findItemsAdvanced', 
    'keywords': upc,
    'sortOrder': 'PricePlusShippingLowest'
  };

  ebay.get('finding', params, function (err, data) {
    if(err) throw err;
    if (data && data.findItemsAdvancedResponse && data.findItemsAdvancedResponse[0].searchResult && data.findItemsAdvancedResponse[0].searchResult[0].item && data.findItemsAdvancedResponse[0].searchResult[0].item[0].title && data.findItemsAdvancedResponse[0].searchResult[0].item[0].galleryURL && data.findItemsAdvancedResponse[0].searchResult[0].item[0].sellingStatus && data.findItemsAdvancedResponse[0].searchResult[0].item[0].sellingStatus[0].convertedCurrentPrice && data.findItemsAdvancedResponse[0].searchResult[0].item[0].shippingInfo && data.findItemsAdvancedResponse[0].searchResult[0].item[0].shippingInfo[0].shippingServiceCost && data.findItemsAdvancedResponse[0].searchResult[0].item[0].viewItemURL) {
      res.status(200).json({
        ebayTitle: data.findItemsAdvancedResponse[0].searchResult[0].item[0].title[0],
        ebayImage: data.findItemsAdvancedResponse[0].searchResult[0].item[0].galleryURL[0],
        ebayPrice: data.findItemsAdvancedResponse[0].searchResult[0].item[0].sellingStatus[0].convertedCurrentPrice[0].__value__,
        ebayShipping: data.findItemsAdvancedResponse[0].searchResult[0].item[0].shippingInfo[0].shippingServiceCost[0].__value__,
        ebayURL: data.findItemsAdvancedResponse[0].searchResult[0].item[0].viewItemURL[0]
      });
    }
    else {
      res.status(200).json({
        ebayTitle: '',
        ebayImage: '',
        ebayPrice: '',
        ebayShipping: '',
        ebayURL: ''
      });
    }
  });
});

// Saved API route, takes email and searchTerm as parameters.  This is used to save search terms to each account

router.get('/saved/:email/:searchTerm', (req, res, next) => {
  let currentEmail = req.params.email
  let currentSearch = req.params.searchTerm
  db.findOneAndUpdate(
    { email: currentEmail },
    { $push: { saved: currentSearch } }
  ).then(function(results) {
  console.log(results.saved);
    res.status(200).json({
      savedResults: results.saved
    })
  })
  .catch(function(err) {
    console.log(err.message);
  });
});

// Retrieval API route, takes email as a parameter.  This is used to retrieve the previously searched items for each account

router.get('/retrieve/:email', (req, res, next) => {
  let currentEmail = req.params.email
  db.find({email: currentEmail}).select('saved -_id').limit(10)
  .then(function(results) {
    console.log("results api")
    console.log(results[0].saved)
    let prevTen = [];
    for (let i=results[0].saved.length -1;i>results[0].saved.length - 6;i--) {
      prevTen.push(results[0].saved[i])
    }
    console.log(prevTen);
    res.status(200).json({
      savedResults: prevTen
    })
  })
})


module.exports = router;