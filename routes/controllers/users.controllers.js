const express = require('express');
const router = express.Router();
const models = require('../../models');
const crypto = require('crypto');

exports.getUi = async function(req,res,next){
    let session =await req.session;
    console.log(session);

    res.render("user/login", {
    session : session
  });
}