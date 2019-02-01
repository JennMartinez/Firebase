// Initialize Firebase //
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
var lightYears = 0;

// Sound Effects //
var x = document.getElementById("myAudio");

function playAudio() {
     x.play();
}

// Function that converts the time and displays the heading, "Light Years Away" //
function calculateLightYearsTime(firstTrain, freq) {
    var f = Number(freq);
    console.log("firstTrain: " + firstTrain + " freq: " + f);
    var convertStartTime = moment(firstTrain, "HH:mm").format("X") / 60;
    var currentTime = moment().format("X") / 60;
    console.log(currentTime);
    var timeDifference = currentTime - convertStartTime;
    var shuttleArrival = Math.floor(timeDifference / f);
    var lastShuttle = (convertStartTime + (shuttleArrival * f)) * 60;
    var nextShuttle = (lastShuttle / 60) + f;
    console.log(nextShuttle);
    console.log(Math.round(nextShuttle - currentTime));
    return Math.round(nextShuttle - currentTime);   
};

// Launch button adds input form to the table //
$("#add-shuttle").on("click", function(event) {
    event.preventDefault();
    playAudio();

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
        lightYearsFirebase: calculateLightYearsTime(firstShuttle, frequency)
    });
});

database.ref().on("child_added", function(snapshot) {
console.log(snapshot.val());    

name = snapshot.val().nameFirebase;
destination = snapshot.val().destinationFirebase;
firstShuttle = snapshot.val().firstShuttleFirebase;
frequency = snapshot.val().frequencyFirebase;
lightYears = snapshot.val().lightYearsFirebase;
console.log("destination: " + destination);

// Clears and resets the input fields after launch button is clicked //
$("#add-shuttle").click(function () {
    $("form").trigger("reset");
});

// Displays input values on the screen under schedule //
$("#rows").append("<tr><td>" + (snapshot.val().nameFirebase) + "</td><td>" + (snapshot.val().destinationFirebase) 
+ "</td><td>" + (snapshot.val().frequencyFirebase) + "</td><td>" + (snapshot.val().firstShuttleFirebase) + "</td><td>"
+ (snapshot.val().lightYearsFirebase) + "</td></tr>");
})

