require('dotenv').config();
var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

//Parse Server
var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || '', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',  // Don't forget to change to https if needed
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  }
});

var options = { allowInsecureHTTP: false };

//Parse Dashboard
var dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": process.env.SERVER_URL || 'http://localhost:1337/parse',  // Don't forget to change to https if needed
      "appId": process.env.APP_ID || 'myAppId',
      "masterKey": process.env.MASTER_KEY || '', //Add your master key here. Keep it secret!
      "appName": "Instashop"
    }
  ]
}, options);

var app = express();

//Enable Cross-origin resource sharing
app.use(cors());

// Parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const routesApi = require('./api/routes/index');

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API and Dashboard on the /parse and /dashboard URL prefixes accordingly
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);
app.use('/dashboard', dashboard);

//Setup API routes
app.use('/api', routesApi);

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
