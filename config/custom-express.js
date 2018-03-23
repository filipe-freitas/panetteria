const express        = require("express");
const methodOverride = require("method-override");
const consign        = require("consign");
const bodyParser     = require("body-parser");

module.exports = function(){
    const app  = express();
    //
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(express.static("public"));
    app.use(methodOverride("_method"));
    //
    consign().include("controller").into(app);
    return app;
}