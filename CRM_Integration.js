
'use strict';
var https = require('https');

//var https = require('http');
//set these values to retrieve the oauth token
var crmorg = 'https://vfs365.api.crm8.dynamics.com';
var clientid = 'd1f82629-cec9-42b8-8a64-aab98b2d6189';
var username = 'crmadmin@VFS365.onmicrosoft.com';
var userpassword = 'Hexaware@123';
var tokenendpoint = 'https://login.windows.net/0b78e424-1823-4673-8d71-295823333a8d/oauth2/token';

//set these values to query your crm data
var crmwebapihost = 'vfs365.api.crm8.dynamics.com';
var crmwebapipath = '/api/data/v8.2/contacts?$select=fullname,contactid'; //basic query to select contacts
var postpathincident='/api/data/v8.0/incidents';
var postpathcontact='/api/data/v8.0/contacts';
//remove https from tokenendpoint url
tokenendpoint = tokenendpoint.toLowerCase().replace('https://','');

var authhost = tokenendpoint.split('/')[0];

//get the authorization endpoint path
var authpath = '/' + tokenendpoint.split('/').slice(1).join('/');

//build the authorization request
//if you want to learn more about how tokens work, see IETF RFC 6749 - https://tools.ietf.org/html/rfc6749





module.exports ={

tokenGeneration: function(incidentData){

  console.log("Hello"+JSON.stringify(incidentData));
},






generateToken: function(contactData,incidentData){



  console.log('inside generate token');

  var reqstring = 'client_id='+clientid;
  reqstring+='&resource='+encodeURIComponent(crmorg);
  reqstring+='&username='+encodeURIComponent(username);
  reqstring+='&password='+encodeURIComponent(userpassword);
  reqstring+='&grant_type=password';

console.log('REQUIRED STRING::'+reqstring);
  //set the token request parameters
var tokenrequestoptions = {
    host: authhost,
    path: authpath,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(reqstring)
    }
};

console.log(tokenrequestoptions);
console.log('going to make request');

//make the token request

var tokenrequest = https.request(tokenrequestoptions, function(response) {
    //make an array to hold the response parts if we get multiple parts
    console.log('hey inside token request');
    var responseparts = [];
    response.setEncoding('utf8');
    response.on('data', function(chunk) {
        //add each response chunk to the responseparts array for later
        responseparts.push(chunk);
    });
    response.on('end', function(){
        //once we have all the response parts, concatenate the parts into a single string
        var completeresponse = responseparts.join('');
        //console.log('Response: ' + completeresponse);
        console.log('Token response retrieved . . . '+JSON.stringify(completeresponse));

        //parse the response JSON
        var tokenresponse = JSON.parse(completeresponse);

        //extract the token
        var token = tokenresponse.access_token;
        console.log("tokenis:::::;"+token);
        //pass the token to our data retrieval function
     //getData(token);
      //contactCreation(token,contactData);

          });
});
tokenrequest.on('error', function(e) {
    console.error(e);
});

//post the token request data
tokenrequest.write(reqstring);

//close the token request
tokenrequest.end();


}
}





function contactCreation(token,contactData){

  console.log("Hello"+contactData);
  console.log("InsidecontactCreation ");
  var requestheaders = {
      'Authorization': 'Bearer ' + token,
      'OData-MaxVersion': '4.0',
      'OData-Version': '4.0',
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8'

  };

//set the crm request parameters
var crmrequestoptions = {
    host: crmwebapihost,
    path: postpathcontact,
    method: 'POST',
    headers: requestheaders
};

console.log("going to call contact crmrequest"+crmrequestoptions);
//make the web api request
var crmrequest = https.request(crmrequestoptions, function(response) {
    console.log('hey inside crm request');
    //make an array to hold the response parts if we get multiple parts
    var responseparts = [];
    response.setEncoding('utf8');
    response.on('data', function(chunk) {
        //add each response chunk to the responseparts array for later
        responseparts.push(chunk);
    });
    response.on('end', function(){
        //once we have all the response parts, concatenate the parts into a single string
        var completeresponse = responseparts.join('');

        console.log("-CONTACT RESPONSE::::::::::-"+completeresponse)

      //parse completeresponse and fetch the contact ID

          logIncident(token,contactID,incidentData);
    });
});
crmrequest.on('error', function(e) {
    console.error(e);
});



console.log("PARAM:::::::::::::"+JSON.stringify(contactData));
//close the web api request
crmrequest.end(JSON.stringify(contactData));


}



function logIncident(token,contactID,incidentData){

  console.log("Hello"+incidentData);
  console.log("InsidePostincidentToken"+token);
  var requestheaders = {
      'Authorization': 'Bearer ' + token,
      'OData-MaxVersion': '4.0',
      'OData-Version': '4.0',
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8'

  };

  //set the crm request parameters
  var crmrequestoptions = {
      host: crmwebapihost,
      path: postpathincident,
      method: 'POST',
      headers: requestheaders
  };

  //make the web api request
  var crmrequest = https.request(crmrequestoptions, function(response) {
      //make an array to hold the response parts if we get multiple parts
      var responseparts = [];
      response.setEncoding('utf8');
      response.on('data', function(chunk) {
          //add each response chunk to the responseparts array for later
          responseparts.push(chunk);
      });
      response.on('end', function(){
          //once we have all the response parts, concatenate the parts into a single string
          var completeresponse = responseparts.join('');

          console.log("-------INCIDENT DATA RESPONSE------------"+completeresponse)




      });
  });
  crmrequest.on('error', function(e) {
      console.error(e);
  });

  /*var incidentData=
              {"title":"VFS complaint 2.0",
               "description":"Case Description goes here",
               caseorigincode:2483,
               casetypecode:2,
               prioritycode:2,
               severitycode:1,
               "customerid_contact@odata.bind":"/contacts(4f4108ef-cf5f-e711-8161-c4346bdd2141)"};*/



  console.log("PARAM"+JSON.stringify(incidentData));
  //close the web api request
  crmrequest.end(JSON.stringify(incidentData));


}



/*function fetchcrmData(contactData,incidentData){
    generateToken(contactData,incidentData);
}
module.exports.fetchcrmData = fetchcrmData;*/


/*function generateToken(contactData,incidentData){




}
//  module.exports.generateToken = generateToken;

function contactCreation(token,contactData){



}

function logIncident(token,contactID,incidentData){



}*/
