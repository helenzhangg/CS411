const request = require('request'); //library for handling api http requests



request('https://www.eventbriteapi.com/v3/events/search/?price=free&token=UR24GALENHRRPDT5BSZ3&location.address=boston, ma', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
});


function callEventBrite(location,price){
    var url_stem = 'https:////www.eventbriteapi.com/v3/events/search/token=UR24GALENHRRPDT5BSZ3'

}

https:////www.eventbriteapi.com/v3/events/search/?token=UR24GALENHRRPDT5BSZ3&location.address=bostonma