// Initialize Firebase
var config = {
    apiKey: "AIzaSyCizBIOPxL0qehK5ShTBcBYH_pJ-0NyQ5E",
    authDomain: "shuttle-scheduler-13d90.firebaseapp.com",
    databaseURL: "https://shuttle-scheduler-13d90.firebaseio.com",
    projectId: "shuttle-scheduler-13d90",
    storageBucket: "shuttle-scheduler-13d90.appspot.com",
    messagingSenderId: "1064157932862"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// Variables //
// Values pulling and pushing from database(Firebase) //

var time = "";
var destination = "";
var firstShuttle = "";
var frequency = "";

$("#add-user").on("click", function(event) {
    event.preventDefault();


time = $("#time-input")
    .val()
    .trim();
destination = $("#destination-input")
    .val()
    .trim();
firstShuttle = $("#first-input")
    .val()
    .trim();
frequency = $("#frequency-input")
    .val()
    .trim();

// Left side is database fieldname/values //
// Right side is user values /

    database.ref().push({
        timeFirebase: time,
        destinationFirebase: destination,
        firstShuttleFirebase: firstShuttle,
        frequencyFirebase: frequency,
    });
});

database.ref().on("value", function(snapshot) {
    console.log((snapshot.val().timeFirebase));
    console.log((snapshot.val().destinationFirebase));
    console.log((snapshot.val().firstShuttleFirebase));
    console.log((snapshot.val().frequencyFirebase));

//   $("#rows").append(columnTd);
$("#rows").append("<tr><td>" + (snapshot.val().timeFirebase) + "</td><td>" + (snapshot.val().destinationFirebase) 
+ "</td><td>" + (snapshot.val().firstShuttleFirebase) + "</td><td>" + (snapshot.val().frequencyFirebase) + "</td></tr>");
})
