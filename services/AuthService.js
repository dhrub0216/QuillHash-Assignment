global.fetch = require('node-fetch');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');

global.navigator = () => null;

const poolData = {
   UserPoolId: "us-east-2_ZWKasH7PU",
   ClientId: "4cprgrkaqhbhvtfnq17s7ih5s1"
};
const pool_region = "us-east-2";
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

exports.Register = function (body, callback) {
   var name = body.name;
   var email = body.email;
   var password = body.password;
   var attributeList = [];
   
   attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "email", Value: email }));
   //console.log(attributeList)
   userPool.signUp(name, password, attributeList, null, function (err, result) {
     if (err){
      callback(err);
     }
      //console.log(userPool)
      console.log(result)   
     var cognitoUser = result.user;
     console.log(cognitoUser)
     callback(null, cognitoUser);
   })
}

exports.Login = function (body, callback) {
   var userName = body.email;
   var password = body.password;
   var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: userName,
        Password: password
    });
    var userData = {
        Username: userName,
        Pool: userPool
    }
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    //console.log(cognitoUser)           //Error debugging
    //console.log(authenticationDetails) //Error debugging 
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
           var accesstoken = result.getAccessToken().getJwtToken();
           callback(null, accesstoken);
        },
        onFailure: (function (err) {
         console.log(err)
         //console.log(err.stack)
           callback(err);
       })
   })
   
};

exports.Validate = function(token, callback){
   request({
       url : `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
       json : true
    }, function(error, response, body){
       if (!error && response.statusCode === 200) {
           pems = {};
           var keys = body['keys'];
           for(var i = 0; i < keys.length; i++) {
                var key_id = keys[i].kid;
                var modulus = keys[i].n;
                var exponent = keys[i].e;
                var key_type = keys[i].kty;
                var jwk = { kty: key_type, n: modulus, e: exponent};
                var pem = jwkToPem(jwk);
                pems[key_id] = pem;
           }
        var decodedJwt = jwt.decode(token, {complete: true});
                if (!decodedJwt) {
                    console.log("Not a valid JWT token");
                    callback(new Error('Not a valid JWT token'));
                }
                var kid = decodedJwt.header.kid;
               // console.log(kid)
                var pem = pems[kid];
                console.log(!pem)
                if (!pem) {
                    console.log('Invalid token');
                    callback(new Error('Invalid token'));
                }
               jwt.verify(token, pem, function(err, payload) {
                    if(err) {
                        console.log("Invalid Token.");
                        callback(new Error('Invalid token'));
                    } else {
                         console.log("Valid Token.");
                         callback(null, "Valid token");
                    }
               });
       } else {
             console.log("Error! Unable to download JWKs");
             callback(error);
       }
   });
}