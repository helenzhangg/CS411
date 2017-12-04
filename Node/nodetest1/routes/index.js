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
    var price = req.body.pricechoice;
    console.log('check the post', state, city);
    var results = [state, city, price];

    // EVENTBRITE API CALL
    var url_stem = 'https://www.eventbriteapi.com/v3/events/search/?token=UR24GALENHRRPDT5BSZ3';
    var location = '&location.address=' +city + state;
    // add 'price' to api_call
    var api_call = url_stem+location;
    console.log(api_call);

    // if price = 1 or 2 use price = 'free'
    // if price = 3 or 4 use price = 'paid'

    // from the request, write the first 5 elements to mongodb
    // store name, venue id, logo (original), description(text) start(local time) and url

    request(api_call, {json:true}, function(error,response,body) {
        if (!error && response.statusCode == 200){
            console.log(body);
        }
        if (error) { return console.log(error); }
        console.log(body.url);
        console.log(body.explanation);
    });


});





module.exports = router;

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
