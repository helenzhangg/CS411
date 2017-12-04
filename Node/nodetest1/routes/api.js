const express = require('express')
const router = express.Router()
const request = require("request");
const rp = require('request-promise')
const EVTBRT = require('../config/Eventbrite')


router.get('/evtsrc/:name', function (req,res,next) {
    let location = req.params.name
    let evtsrcresult = {}
    var options = { method: 'GET',
        url: 'https://www.eventbriteapi.com/v3/events/search/',
        qs:
            { price: 'free',
                token: EVTBRT.Token,
                'location.address': location },
        headers:
            { 'postman-token': '99968314-bd31-2e09-c622-97a792d0db8a',
                'cache-control': 'no-cache' } };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        evtsrcresult = body
        console.log(body)
        res.json(JSON.parse(evtsrcresult))
    });
})

router.get('/vensrc/:name', function (req,res,next) {
    let venid = req.params.name
    let vensrcresult = {}
    var options = { method: 'GET',
        url: 'https://www.eventbriteapi.com/v3/venues/'+ venid,
        qs: { token: EVTBRT.Token },
        headers:
            { 'postman-token': 'd818c2f7-57e0-2c08-06dd-01d0f168da3b',
                'cache-control': 'no-cache' } };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        vensrcresult = body
        console.log(body)
        res.json(JSON.parse(vensrcresult))
    });


})



// // getting the geo coordinates throughout the Google GEOcode API
// router.get('/geocode/:name', function (req, res, next) {
//
//     let str = req.params.name
//     let georesult = {}
//     var options = { method: 'GET',
//         url: 'https://maps.googleapis.com/maps/api/geocode/json',
//         qs:
//             { address: str,
//                 key: GEOKEY.key },
//   };
//
//     //parse the JSON file to get only the geo coordinates
//     rp(options)
//         .then(function(response, error) {
//             if (error) {
//                 throw new Error(error)
//             } else {
//                 georesult = response
//                 // console.log(response);
//                 myJSONResult= JSON.parse(georesult)
//
//
//                 mygeodata=[]
//                 for (i = 0; i < myJSONResult.results.length; i++) {
//                     mygeodata[i] = myJSONResult.results[i].geometry.location;
//                 }
//                 res.json(mygeodata[0])
//
//
//                 flagLAT=mygeodata[0].lat
//                 flagLNG=mygeodata[0].lng
//
//
//             }
//         })
//     })

// //doing search for restaurants within 1000meters
// router.get('/ressrc/:name', function (req, res, next) {
//
//     let str = req.params.name
//     let resresult = {}
//     var options = { method: 'GET',
//         url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
//         qs:
//             { location: str,
//                 rankby: 'distance',
//                 types: 'restaurant',
//                 key: 'AIzaSyDWvz81IMfM1kKl9m1xP-5lwyK1bUhMRhk' },
//          };
//
//     //parse the JSON file to get only the restaurant info
//     rp(options)
//         .then(function(response, error) {
//             if (error) {
//                 throw new Error(error)
//             } else {
//                 resresult = response
//                 console.log(str)
//                 // console.log(response);
//                 myJSONResult= JSON.parse(resresult)
//                 res.json(myJSONResult)
//             }
//         })
// })




// // getting all restaurant's name and coords through database api
// router.get('/plcsrc/:name', function (req, res, next) {
//     let str = req.params.name
//     let plcsrcresult = {}
//     var options = { method: 'GET',
//         url: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
//         qs: { query: str, key: 'AIzaSyDPbfAZJhv0QyUGE8vmDlhNvBq4wTScgu0' },
//         headers:
//             { 'postman-token': '9cf1af44-c5e4-655b-4f3f-cb7b104e0df3',
//                 'cache-control': 'no-cache' } };
//
//     request(options, function (error, response, body) {
//         if (error) throw new Error(error);
//         plcsrcresult = body
//         res.json(JSON.parse(plcsrcresult))
//     });
// })





module.exports = router

//TODO Route to log out (req.logout())