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

// more routes for our API will happen her///e
///dfhdfhkf
//dfgtopopopopopopopopoph
//dkjfksf

// on routes that end in /bears
// ----------------------------------------------------

router.route('/getDate_subject')
   .post(function(req, res) {

      var db = admin.database();

var ref_datesub = db.ref("project/UserData/" + req.body.UID +  "/checkDate" );

console.log("Firebase started ~~~~~~~~");


var valueRe =[];
var object = {} // empty Object
var key = 'dataDate_subject';
object[key] = [];


ref_datesub.on("value", function(snapshot) {
  
  var data = snapshot.val();

  snapshot.forEach(function (childSnapshot) {

            var value = childSnapshot.val();
            var data = {
                  subject:  value.subject,
                  date: value.date
              };

       object[key].push(data);
   

        });

      //console.log(req.body.UID);
        res.json( object
        );
  //res.json({ message: valueRe });
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});


 
        
    });



router.route('/getDataNumber')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

      var db = admin.database();
var ref = db.ref("project/UserData/" + req.body.UID + "/" + "Subject/" +req.body.Subject + "/" + req.body.date );

console.log("Firebase started ~~~~~~~~");

var valueRe =[];
var object = {} // empty Object
var key = 'dataNumber';
object[key] = [];

ref.on("value", function(snapshot) {
 
  var data = snapshot.val();
   

  snapshot.forEach(function (childSnapshot) {

            var value = childSnapshot.val();
            var data = {
                  noid:  value.noid
                  
              };
             object[key].push(data);

            //console.log("Title is : " + value.noid);
          // valueRe.push(value.noid);

        });
        res.json( object
        );
  //res.json({ message: valueRe });
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
      
 
        
    });



router.route('/setDate_Subject')
    .post(function(req, res) {

var db = admin.database();
var ref_datesub = db.ref("project/UserData/" + req.body.UID );
var postsRef = ref_datesub.child("/checkDate");

             postsRef.push({
              date: req.body.checkDate ,
              subject: req.body.subject
             //console.log("Push Successful");
             });

             res.json({ Success: true});
           


      //console.log(req.body.UID);
      
  //res.json({ message: valueRe });
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});




router.route('/setDataSubject').post(function(req, res) {



var db = admin.database();
var ref = db.ref("project/UserData");
var postsRef = ref.child("Subject");
             postsRef.push({
             subject: req.body.subject
             //console.log("Push Successful");
             });

             res.json({ Success: true});
           


      //console.log(req.body.UID);
      
  //res.json({ message: valueRe });
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
      

router.route('/getDataSubject')
   .post(function(req, res) {

      var db = admin.database();
var ref = db.ref("project/UserData/Subject");
var object = {}; // empty Object
var key = 'dataSubject';
object[key] = [];
console.log("Firebase started ~~~~~~~~");


var valueRe =[];

ref.on("value", function(snapshot) {
  //console.log("Element : ");
  var data = snapshot.val();

  snapshot.forEach(function (childSnapshot) {

            var value = childSnapshot.val();
            var data = {
                  Subject:  value.subject
                  
              };
             object[key].push(data);

            //console.log("Subject is : " + value.subject);
     // valueRe.push(value.subject);

        });

      //console.log(req.body.UID);
        res.json( object
        );
  //res.json({ message: valueRe });
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
      
 
        
    });


//router.route('/setDate')
  //  .post(function(req, res) {

//  var db = admin.database();
//var ref = db.ref("project/UserData/" + req.body.UID +  "/Subject/" +req.body.Subject );
//var postsRef = ref.child("/checkDate");
 //            postsRef.push({
   //          date: req.body.checkDate
             //console.log("Push Successful");
     //        });

       //      res.json({ Success: true});
           


      //console.log(req.body.UID);
      
  //res.json({ message: valueRe });
//}, function (errorObject) {
  //console.log("The read failed: " + errorObject.code);
//});




router.route('/setDataNumber')
    .post(function(req, res) {

  var db = admin.database();
var ref = db.ref("project/UserData/" + req.body.UID + "/" + "Subject/" +req.body.Subject + "/"  );
var postsRef = ref.child(req.body.date);
             postsRef.push({
             noid: req.body.noid
             //console.log("Push Successful");
             });

             res.json({ Success: true});
           


      //console.log(req.body.UID);
      
  //res.json({ message: valueRe });
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});      







      
       

                 
  
//   console.log("The read failed");

      
 
        
//     });



app.use('/api', router);