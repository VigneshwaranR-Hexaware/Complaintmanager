const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const https= require('https');
var http = require('http');
const JSONbig = require('json-bigint');
const async = require('async');
const requestPromise = require('request-promise');
var request=require('request');
var deasync = require('deasync');
const port = process.env.PORT || 3000;
const facebookApp=require('./app.js');
exports.handler=function(event,context){
    console.log(event);
    if(event.hasOwnProperty('result')){
        console.log('Recieved Request from Api.Ai');
        if(event.hasOwnProperty('originalRequest')){
            if(event.originalRequest.source ==="facebook"){
                console.log("Recieved Request from Facebook");
                if(event.result.action ==="Confirmation-Intent"){
                    facebookApp.ConfirmationIntend(event,context);
                }
            }
        }
    }
}