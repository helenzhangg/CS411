var express = require('express');
var router = express.Router();
const request = require('request');
const evtbrt = require('../config/Eventbrite')
const ylp = require('../config/yelp')


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


//Helper for authorization
const authorized = require('./OauthCheck')


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
    var db = req.db;
    console.log('check the post', state, city, price, activity);
    var results = [state, city, price];


    // function thenRedirectToResults() {

    // }

        // thenRedirectToResults();
    // }


    function callEventsFirst(){
        // EVENTBRITE API CALL
        var url_stem = 'https://www.eventbriteapi.com/v3/events/search/?token='+evtbrt.Token;
        var location = '&location.address=' +city + ',' + state + '.' + zip;

        // var ven_api = 'https://www.eventbriteapi.com/v3/venues/21047555?token='+evtbrt.Token


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
        // console.log(api_call);

        // from the request, write the first 5 elements to mongodb
        // store name, venue id, logo (original), description(text) start(local time) and url

        // var evt_name = [];              //Event Name
        // var evt_venue = [];             //Event venue id
        // var evt_logo = [];              //Event logo, gave up this variable because of its supernatural bug
        // var evt_des = [];               //Event description
        // var evt_str = [];               //Event start time
        // var evt_url = [];               //Event url

        function isDefined(x) {
            var undefined;
            return x !== undefined;
        }
        var count = 0;
        var collection = db.get('lastEventBriteResults');
        collection.drop();
        var new_collection = db.get('lastEventBriteResults');


        request(api_call, {json:true}, function(error,response,body) {
            if (!error && response.statusCode == 200){
                for (let item of body.events) {             //for loop append each particular value into variables

                    var data = eval(item.logo)
                    var myJSON = JSON.stringify(data);
                    var obj = JSON.parse(myJSON);
                    if(obj && isDefined(obj.original)) {
                        var entry = {};
                        entry['event_name'] = item.name.text;
                        //Here is the nested api call that I use to get event address from the venue id I just get from event search api
                        var ven_api = 'https://www.eventbriteapi.com/v3/venues/'+item.venue_id+'?token='+evtbrt.Token
                        request(ven_api, {json:true}, function(error,response,ven_body) {
                            if (!error && response.statusCode == 200){
                                var ven_address = ven_body.address.address_1+','+ven_body.address.city+','+ven_body.address.region+' '+ven_body.address.postal_code;
                                entry['event_address'] = ven_address;
                                console.log(ven_address);


                            }
                        })

                        entry['event_venue'] = item.venue_id;
                        entry['event_desc'] = item.description.text;
                        entry["event_start"] = item.start.local;
                        entry["event_start"] = entry["event_start"].substring(0,10);
                        entry["event_start"] = entry["event_start"].replace('-','/');
                        entry["event_start"] = entry["event_start"].replace('-','/');
                        entry["event_link"] = item.url;
                        entry["event_logo_url"] = obj.original.url;
                        new_collection.insert(entry);
                        //////////////////////////////////////////////////////////////////////////////////////////////
                    }

                    count ++;
                    if (count == 6){
                        break;
                    }

                }







                {
                    var collection_yelp = db.get('lastYelpResults');
                    collection_yelp.drop();
                    var new_collection_yelp = db.get('lastYelpResults');
                    var options = {
                        method: 'GET',
                        url: 'https://api.yelp.com/v3/businesses/search',
                        qs:
                            {
                                term: activity,
                                location: city,
                                price: price,
                                limit: '12',
                                Authorization: ylp.Authorization,
                                sort_by: 'distance'
                            },
                        headers:
                            {
                                'postman-token': '47e93a17-4c85-2e8d-322d-da1fd096ffd6',
                                'cache-control': 'no-cache',
                                authorization: ylp.Authorization,
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                        form:
                            {
                                grant_type: 'client_credentials',
                                client_id: ylp.client_id,
                                client_secret: ylp.client_secret
                            }
                    };

                    request(options, function (error, response, body) {
                        if (error) throw new Error(error);
                        {

                            var obj = JSON.parse(body);
                            for (let item of obj['businesses']) {             //for loop append each particular value into variables

                                var entry = {};

                                entry['yelp_name'] = item.name;

                                entry['yelp_venue'] = '';
                                for (i=0;i< item.location.display_address.length;i++){
                                    entry['yelp_venue'] = entry['yelp_venue'] + ' ' + item.location.display_address[i];
                                }
                                entry['yelp_url'] = item.url;


                                entry['yelp_category'] = item.categories[0].title;
                                entry["yelp_rating"] = item.rating;
                                entry["yelp_image"] = item.image_url;
                                new_collection_yelp.insert(entry);

                            }


                            res.redirect('results');




                            // console.log(options);                // uncomment to check yelp call
                            // console.log(evt_logo)                //console for testing output of particular variables
                        }
                        if (error) {
                            return console.log(error);
                        }
                        // console.log(body.url);
                        // console.log(body.explanation);
                        // console.log(obj);
                    });
                }

                // console.log(evt_logo)                //console for testing output of particular variables
            }
            if (error) { return console.log(error); }
            // console.log(body.url);
            // console.log(body.explanation);
        });

        // callback();
    }

callEventsFirst();
    // callEventsFirst(thenCallYelp);
    // thenCallYelp(thenRedirectToResults());

});

/* GET Results page. */
router.get('/results', function(req, res) {
    var db = req.db;
    var event_brite_docs = {};
    var yelp_docs = {};

    function doEventsFirst(callback){
        var collection = db.get('lastEventBriteResults');
        collection.find({},{},function(e,docs){

            // console.log('STEP 1');

            // console.log('FOLLOWING IS EVENT BRITE COPY');
            event_brite_docs = docs;
            // console.log(event_brite_docs);
        });

        var collection2 = db.get('lastYelpResults');
        collection2.find({'yelp_image':{$ne:""}},{}, function(e, docs){
        // collection2.find({},{},function(e,docs){

            // console.log('STEP 2');
            // console.log('THE FOLLOWING IS YELP-DOCS COPY');


            yelp_docs=docs;
            // console.log(yelp_docs);

            // loading page
            // console.log('STEP 3');
            // console.log('FOLLOWING IS EVENT_DOCS AND YELP_DOCS');
            // console.log(event_brite_docs);
            // console.log(yelp_docs);



            res.render('results',{
                "event_docs" :event_brite_docs,
                "yelp_docs": yelp_docs});
        });


        // thenYelpEvents(lastRenderPage);
    }

//    call the functions in the correct order, so results loads once all async. stuff is done

    doEventsFirst();
    // doEventsFirst(thenYelpEvents);
    // thenYelpEvents(lastRenderPage());

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
