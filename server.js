///Android ต้อง query DATADATE ก่อน DATANUMBER

var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert("proj-node-firebase-adminsdk-4ts44-22822b4952.json"),
  databaseURL: "https://proj-node.firebaseio.com"
});




var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// on routes that end in /bears
// ----------------------------------------------------
router.route('/getDataNumber')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

    	var db = admin.database();
var ref = db.ref("project/UserData/" + req.body.UID + "/" + "Subject/" +req.body.Subject + "/" + req.body.date);

console.log("Firebase started ~~~~~~~~");


var valueRe =[];

ref.on("value", function(snapshot) {
  console.log("Element : ");
  var data = snapshot.val();

  snapshot.forEach(function (childSnapshot) {

            var value = childSnapshot.val();
            console.log("Title is : " + value.noid);
			valueRe.push(value.noid);

        });

  		console.log(req.body.UID);
        res.json({ noid: valueRe});
  //res.json({ message: valueRe });
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
      
 
        
    });

///Android ต้อง query DATADATE ก่อน DATANUMBER

router.route('/getDataDate')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

    	var db = admin.database();
var ref = db.ref("project/UserData/" + req.body.UID + "/" + "Subject/" + req.body.Subject);

console.log("Firebase started ~~~~~~~~");

var valueRe = [];

ref.on("value", function(snapshot) {
  console.log("Element : ");
  var data = snapshot.val();
 snapshot.forEach(function (childSnapshot) {

            var value = childSnapshot.val();
            console.log("Title is : " + value.checkdate);
			valueRe.push(value.checkdate);

        });

  		console.log(req.body.UID);
        res.json({ checkdate: valueRe});
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
        
        
        
    });



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
