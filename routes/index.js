const express = require('express');
const router = express.Router();
const models = require('../models');

const indexsController = require('./controllers/indexs.controllers');



// controller 폴더로 관리

router.get('/', indexsController.mainPage);


/* GET home page. */
/*
router.get('/', function(req, res, next) {

  let session = req.session;

  res.render("index", {
    session : session
  });
});
*/
/*
router.get('/', function(req, res, next) {

  let token = req.cookies.user;
  console.log(token);
  res.render("index", {
    token : token
  });
});
*/

/*
router.get('/create', function(req, res, next) {
  client.query("SELECT * FROM user;", function(err, result, fields){
    if(err){
      console.log("쿼리문에 오류가 있습니다.");
    }
    else{
      res.render('create', {
        results: result
      });
    }
  });
});

router.post('/create', function(req, res, next) {
  var body = req.body;

  client.query("INSERT INTO user (username, email, pwd) VALUES (?, ?, ?)", [
    body.name, body.email, body.password
  ], function(){
    res.redirect("/create");
  });
});
*/


module.exports = router;
