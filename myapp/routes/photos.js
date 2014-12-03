var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET users listing. */
router.get('/:tag', function(req, res) {

  // db.Set.findOrCreate({where: {setname: req.param('tag')}})
  //       .complete(function(err, results){
  //         db.Photo.create({
  //           SetId: results[0].dataValues.id,
  //           url: 'http://www.dogtraining-hampshire.co.uk/dog_training_classes_puppy_1.jpg',
  //           rank: 0
  //         });
  //       });
  // console.log(req.param('tag'));
  db.Set.findOrCreate({where: {setname: req.param('tag')}})
        .complete(function(err, results){
    db.Photo.findAll({where: {SetId: results[0].dataValues.id}})
      .complete(function(err, results){
        // optional mapping step
        res.send(results);
      });
    });
  });

router.post('/:tag', function(req, res) {

  // db.User.findOrCreate({where: {username: req.body.username}})
  //       .complete(function(err, results){
  //         db.Message.create({
  //           userid: results[0].dataValues.id,
  //           text: req.body.message,
  //           roomname: req.body.roomname
  //         }).complete(function(err, results){
  //           res.sendStatus(201);
  //         });
  //       });
  // console.log('in post!');
  if (req.param('tag') === 'add') {
    db.Set.findOrCreate({where: {setname: req.body.setname}})
        .complete(function(err, results){
          db.Photo.create({
            SetId: results[0].dataValues.id,
            url: req.body.formUrl,
            rank: 0
          });
        });
    db.Set.findOrCreate({where: {setname: req.body.setname}})
        .complete(function(err, results){
          // console.log(req.body.formUrl);
          db.Photo.findAll({where: {SetId: results[0].dataValues.id}})
      .complete(function(err, results){
          for (var i = 0; i < results.length; i++) {
            results[i].dataValues.rank = 0;
            results[i].save();
          }
        });
    });
    res.sendStatus(201);
  } else {
    db.Photo.findOrCreate({where: {id: req.param('tag')}})
          .complete(function(err, results){
            console.log('in db query');
            results[0].dataValues.rank = req.body.rank;
            results[0].save();
          });
    res.sendStatus(201);
  }
});

module.exports = router;
