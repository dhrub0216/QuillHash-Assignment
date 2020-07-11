AWS.config.credentials = new AWS.CognitoIdentityCredentials({
   IdentityPoolId: 'us-east-2_BuD5oZd4R',
  
 });

 // set the default config object
var creds = new AWS.CognitoIdentityCredentials({
   IdentityPoolId: 'us-east-1:1699ebc0-7900-4099-b910-2df94f52a030'
  });
  AWS.config.credentials = creds;

  // Called when an identity provider has a token for a logged in user
function userLoggedIn(providerName, token) {
   creds.params.Logins = creds.params.Logins || {};
   creds.params.Logins[providerName] = token;
                     
   creds.expired = true;
 }