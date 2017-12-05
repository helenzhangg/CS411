var express = require('express');
var router = express.Router();
const request = require('request');


// var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Welcome page. */
router.get('/welcome', function(req, res, next) {
  res.render('welcome', { title: 'Welcome to Woku!' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");

        }
    });

});


// POST to add user's choice
router.post('/addchoice', function (req,res) {

  var db = req.db;
  var choice = req.body.choice;

  console.log("bye");
  var collection = db.get('usercollection');
  collection.insert({
    "type": choice},
    function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
  });

});


router.post('/api', function (req,res) {

    // these variables grab value from jade by name attribute
    var state = req.body.state;
    var city = req.body.city;
    var zip = req.body.zip;
    var price = req.body.pricechoice;
    var activity = req.body.activitychoice;
    console.log('check the post', state, city, price, activity);
    var results = [state, city, price];

    // EVENTBRITE API CALL
    var url_stem = 'https://www.eventbriteapi.com/v3/events/search/?token=UR24GALENHRRPDT5BSZ3';
    var location = '&location.address=' +city + ',' + state + '.' + zip;
    
    // add 'price' to api_call
    // if price = 1 or 2 use price = 'free'
    if (price==1 | price ==2){
        var api_price = '&price=free';
    }
    // if price = 3 or 4 use price = 'paid'
    if (price==3 | price==4){
        var api_price = '&price=paid';
    }
    var api_call = url_stem+api_price+location;
    console.log(api_call);

    // from the request, write the first 5 elements to mongodb
    // store name, venue id, logo (original), description(text) start(local time) and url

    var evt_name = [];              //Event Name
    var evt_venue = [];             //Event venue id
    // var evt_logo = [];              //Event logo
    var evt_des = [];               //Event description
    var evt_str = [];               //Event start time
    var evt_url = [];               //Event url
    request(api_call, {json:true}, function(error,response,body) {
        if (!error && response.statusCode == 200){
            for (let item of body.events) {             //for loop append each particular value into variables
                evt_name.push(item.name.text);
                evt_venue.push(item.venue_id);
                // evt_logo.push(item.logo.original);               //supernatural bug, cannot help with it
                evt_des.push(item.description.text);
                evt_str.push(item.start.local);
                evt_url.push(item.url);

            }
            // console.log(evt_logo)                //console for testing output of particular variables
        }
        if (error) { return console.log(error); }
        // console.log(body.url);
        // console.log(body.explanation);
    });
    var url_yelp = 'https://api.yelp.com/v3/businesses/search?term=' + activity + '&location='+ city +'&price=' + price + '&Authorization=Bearer2rrk6a3kWZLBoZs2d1AVDu3ui3FEVX0trMCDwSzJm7CLE1julO2TBszCxlQCL3siV34fBvPFjL2E08dwwXNCGL3QRibByfKMj3wTXBZJ2oP2uPIG8XYN_0EOzrvyWXYx&sort_by=distance';
    console.log(url_yelp);
    var evt_name_yelp = [];              //Event Name
    var evt_venue_yelp = [];             //Event venue id
    // var evt_logo = [];              //Event logo
    var evt_catgr_yelp = [];               //Event description
    var evt_rating_yelp = [];               //Event start time
    var evt_url_yelp = [];               //Event url
    request(url_yelp, {json:true}, function(error,response,body) {
        if (!error && response.statusCode == 200){
            for (let item of body.events) {             //for loop append each particular value into variables
                evt_name_yelp.push(item.name.text);
                evt_venue_yelp.push(item.location.display_address);
                // evt_logo.push(item.logo.original);               //supernatural bug, cannot help with it
                evt_catgr_yelp.push(item.categories.title;
                evt_rating_yelp.push(item.rating);
                evt_url_yelp.push(item.image_url);

            }
            // console.log(evt_logo)                //console for testing output of particular variables
        }
        if (error) { return console.log(error); }
        // console.log(body.url);
        // console.log(body.explanation);
    });

});






/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});


module.exports = router;
