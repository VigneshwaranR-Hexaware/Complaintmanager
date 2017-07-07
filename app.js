let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let https= require('https');
var port = process.env.PORT || 3000;

module.exports={
    ConfirmationIntend(event,context){
        console.log('triggering ConfirmationIntend');
        console.log(event.result.contexts);
    }
}