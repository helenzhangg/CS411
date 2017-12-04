var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// /* GET users listing. */
// router.get('/userlist', function(req, res, next) {
//     var db = req.db;
//     var collection = db.get('userlist');
//     collection.find({},{},function(e,docs){
//         res.json(docs);
//     });
// });
//
//
// /* POST到adduser. */
// //POST to add user only for logged in users
// router.post('/adduser',  function (req, res) {
//     var db = req.db;
//     var collection = db.get('userlist');
//     collection.insert(req.body, function(err, result){
//         res.send(
//             (err === null) ? {msg: ''} : {msg: err}
//         );
//     });
// });
// /* DELETE 到 deleteuser */
// router.delete('/deleteuser/:id', function (req, res) {
//     var db = req.db;
//     var collection = db.get('userlist');
//     var userToDelete = req.params.id;
//     collection.remove({'_id': userToDelete}, function(err){
//         res.send((err === null) ? {msg: ''} : { msg:'error: ' + err });
//     });
// });

// //PUT Update the specified user's name
// router.put('/db/:_id', function (req, res, next) {
//     people.findByIdAndUpdate(req.params._id, req.body, {'upsert': 'true'}, function (err, result) {
//         if (err) {
//             res.json({message: 'Error updating'})
//         }
//         else {
//             console.log('updated')
//             res.json({message: 'success'})
//         }
//
//     })
//
// })



module.exports = router;
