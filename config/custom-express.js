const express    = require('express');
const consign    = require('consign');
const bodyParser = require('body-parser');

module.exports = function(){
    const app  = express();
    //
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(express.static('public'));
    //
    consign().include('controller').into(app);
    return app;
}