'use strict';
const express = require('express');
const signupRouters=express.Router();
const {users}=require('../models/index');
const bcrypt = require('bcrypt');

signupRouters.get('/',(req,res)=>{
    res.send("Welcome to my basic-auth server!");
})
signupRouters.post('/signup',async(req,res)=>{
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const record = await users.create(req.body);
        res.status(201).json(record);
      } catch (e) { res.status(403).send('Error Creating User, Try Another Username'); }

})

module.exports=signupRouters;

