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
var frequency = "";

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

// Left side is database fieldname/values //
// Right side is user values /

    database.ref().push({
        nameFirebase: name,
        destinationFirebase: destination,
        firstShuttleFirebase: firstShuttle,
        frequencyFirebase: frequency,
    });
});

database.ref().on("value", function(snapshot) {
    // console.log((snapshot.val().nameFirebase));
    // console.log((snapshot.val().destinationFirebase));
    // console.log((snapshot.val().firstShuttleFirebase));
    // console.log((snapshot.val().frequencyFirebase));

//   $("#rows").append(columnTd);
$("#rows").append("<tr><td>" + (snapshot.val().nameFirebase) + "</td><td>" + (snapshot.val().destinationFirebase) 
+ "</td><td>" + (snapshot.val().firstShuttleFirebase) + "</td><td>" + (snapshot.val().frequencyFirebase) + "</td></tr>");
})

var timeFrequency = 5;

// The time states, 12:00 pm //

var firstShuttleTime = "12:00";

// Initial arrival time //

var firstShuttleTimeConverted = moment(firstShuttleTime, "HH:mm").subtract(1, "years");
console.log(firstShuttleTimeConverted);

// Present Time //

var presentTime = moment();

// Difference between the Shuttle Times //

var diffTime = moment().diff(moment(firstShuttleTimeConverted), "minutes");

// Frequency of Shuttles //

var timeRemaining = diffTime % timeFrequency;
console.log(timeRemaining);

// Minutes that shuttle is Away //

var timeForNextShuttle = timeFrequency - timeRemaining;

// Next shuttle arrival //

var nextShuttle = moment().add(timeForNextShuttle, "minutes");


