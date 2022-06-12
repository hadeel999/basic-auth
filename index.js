'use strict';
require('dotenv').config();
let PORT = process.env.PORT || 3000;
const server=require("./auth/server");

const {db}=require("./auth/models/index");
db.sync().then(() => {
        // start();
        server.start(PORT);
    }).catch(console.error);
