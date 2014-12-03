var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET users listing. */
router.get('/', function(req, res) {

  // console.log(req.body);
  db.Set.findAll()
    .complete(function(err, results){
      // optional mapping step
      res.send(results);
    });
  });

router.post('/', function(req, res) {

  // console.log(req.body);
  db.Set.findOrCreate({where: {setname: 'cats'}})
        .complete(function(err, results){
          // db.Set.create({
            // rank: 0
          // });
        });
  res.send({d:3});
});

module.exports = router;
