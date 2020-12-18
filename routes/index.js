const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

let client = mysql.createConnection({
  user: "root",
  password: "abcd1234",
  database: "user_db"
})

/* GET home page. */
router.get('/', function(req, res, next) {

  let session = req.session;

  res.render("index", {
    session : session
  });
});

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


module.exports = router;
