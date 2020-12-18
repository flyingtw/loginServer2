const express = require('express');
const router = express.Router();
const models = require('../models');
const crypto = require('crypto');

const jwt = require('jsonwebtoken');
const secretObj = require('../config/jwt');



router.get('/login', function(req,res,next){
    let token = jwt.sign({
        email: "twkimd@smilegate.com"
    },
    secretObj.secret,
    {
        expiresIn: '5m'
    })

    models.user.findOne({
        where: {
            email: "twkimd@smilegate.com"
        }
    })
    .then(user => {
        if(user.password === "OSQdKOnFMVV1VrFwLAKaZlB77+oGVqNaSlf3A6YpeW7PG8FAxyvqT8tqYhoMLkM3p7dnBZFtWHSEC+ujOtJzyg=="){
            res.cookie('user', token);
            
            res.render('test/login',{
                user:token
            })
        }
    })
    .catch((err) =>{
        res.status(404).json({
            text: "user not found",
            error: err
        })
    })
});

router.get('/istoken', function(req,res,next){
    let token = req.cookies.user;

    let decoded = jwt.verify(token, secretObj.secret);
    if(decoded){
        if(decoded.email=="kwang1239@hanmail.net"){
            res.send("kwang(관리자)");    
        }
        else{
            res.send("평범한인간");
        }
        //res.json(decoded);
        //res.send("권한이 있어서(토큰이 확인되어서)  API 수행 가능");
    }
    else{
        res.send("권한이 없습니다.");
    }
});


module.exports = router;