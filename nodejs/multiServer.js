// The below variables will be used if you do not specify them for a database //
var default_ApiToken = ""; // Can be used to set all databases to the same ApiToken
var default_StartupQueries = [];

// Set up the servers, if you wish to use a default value you can substitute the value for null
// registerDatabase(string Path, string databaseFile[, optional string ApiToken, optional array StartupQueries]);
/* Example:
registerDatabase("/database1", "./.view/database1.db", null, ["CREATE TABLE IF NOT EXISTS ..."]); // use default api token
registerDatabase("/database2", "./.view/database2.db", "newApiToken"); // specify api token, and use default startup queries
registerDatabase("/database3", "./.view/database3.db"); // use both default api token and default startupQueries
*/
registerDatabase("/database1", "./database1_test.db", "ApiToken1", [
    "CREATE TABLE IF NOT EXISTS `users` (userid INT, username VARCHAR(80), description VARCHAR(500))"
 ]);


const expressMod = require("./expressModule.js");

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

app.all("/", function(req, res) {
  res.send("Well, hello there Wanderer!");
});


function registerDatabase(Path, databaseFile, ApiToken, StartupQueries) {
  if (databaseFile == null) { console.error("Database File not specified."); }
  if (Path == null) { console.error("Path not specified."); }

  if (ApiToken == null) { ApiToken = default_ApiToken };
  if (StartupQueries == null) { ApiToken = default_StartupQueries };
  if (Path.substring(0, 1) != "/") { Path = "/" + Path };
  
  app.use(Path, expressMod({
    databaseFile: databaseFile,
    ApiToken: ApiToken,
    startupQueries: StartpQueries
  }));
}


var list = app.listen(PORT, function() {
  console.log('Server Online, Port ' + list.address().port);
});
