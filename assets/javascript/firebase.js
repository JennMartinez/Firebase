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

var name = "";
var destination = "";
var firstShuttle = "";
var frequency = 0;

$("#add-shuttle").on("click", function(event) {
    event.preventDefault();


name = $("#name-input")
    .val()
    .trim();
destination = $("#destination-input")
    .val()
    .trim();
firstShuttle = $("#time-input")
    .val()
    .trim();
frequency = $("#frequency-input")
    .val()
    .trim();
console.log(name);
console.log(destination);
console.log(firstShuttle);
console.log(frequency);

// Left side is database fieldname/values //
// Right side is user values /

    database.ref().push({
        nameFirebase: name,
        destinationFirebase: destination,
        firstShuttleFirebase: firstShuttle,
        frequencyFirebase: frequency,
    });
});

database.ref().on("child_added", function(snapshot) {
console.log(snapshot.val());    

name = snapshot.val().name;
destination = snapshot.val().destination;
firstShuttle = snapshot.val().firstShuttle;
frequency = snapshot.val().frequency;

// Moment that is used to calculate the Minutes away and Frequency of each shuttle //
// // Initial arrival time //
var firstShuttleTimeConverted = moment(firstShuttle, "HH:mm");

// // Present Time //
var presentTime = moment();

// // Difference between the Shuttle Times //
var diffTime = presentTime.diff(moment(firstShuttleTimeConverted), "minutes");

// // Frequency of Shuttles //
var lastShuttleA = firstShuttle % frequency;

// // Minutes that shuttle is Away //
var nextShuttle = frequency - lastShuttleA;

// Next shuttle arrival //
var nextShuttle = presentTime.add(nextShuttle, "minutes");

// Converts into military time //
var militaryTime = nextShuttle.format("HH:mm");

// Displays input values on the scree //
$("#rows").append("<tr><td>" + (snapshot.val().nameFirebase) + "</td><td>" + (snapshot.val().destinationFirebase) 
+ "</td><td>" + (snapshot.val().firstShuttleFirebase) + "</td><td>" + (snapshot.val().frequencyFirebase) + "</td><td>" + (snapshot.val().nextShuttle) + "</td></tr>");
})

//  Need to clear input fields after click launch button //