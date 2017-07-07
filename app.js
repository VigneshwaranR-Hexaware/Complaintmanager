let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let https= require('https');
var port = process.env.PORT || 3000;

module.exports={
    ConfirmationIntend(event,context){
        console.log('triggering ConfirmationIntend');
        console.log("facebook Result" + event.result.contexts);
        var phoneNumber=event.result.contexts[0].phone-number;
        var Name=event.result.contexts[0].Firstname+""+event.result.contexts[0].lastName;
        Console.log(JSON.stringify(phoneNumber));
        Console.log(JSON.stringify(Name));
        
    }
}