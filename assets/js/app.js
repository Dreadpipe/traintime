// Do I need document ready anymore?  It seems as though its been weeded out of most exercises
// BUGS:
// 1) Countdowns not actually counting down
// 2) Firebase updating with trains not cleared from storage; need to use push instead of set, need to clear?
// 3) 

// Initialize Firebase
    var config = {
    apiKey: "AIzaSyBD_unmivJQEKZclCi-E5vKfqQMdtAI85E",
    authDomain: "pushpractice-6d010.firebaseapp.com",
    databaseURL: "https://pushpractice-6d010.firebaseio.com",
    projectId: "pushpractice-6d010",
    storageBucket: "pushpractice-6d010.appspot.com",
    messagingSenderId: "75429631206"
};
    firebase.initializeApp(config);



const database = firebase.database();
$("#add-train-btn").on("click", function (event) {
    //Prevents submit from refreshing page
    event.preventDefault();
    //Grabs name of the train
    let train = $("#train-name-input").val().trim();
    //Grabs user destination inputs
    let destination = $("#destination-input").val().trim();
    //Grabs first depature
    let time = $("#departure-input").val().trim();
    //Captures frequency of train
    let frequency = $("#frequency-input").val().trim();
    // Moves the time to prior the relative hour, else the train may register after current time
    // thanks to Trilogy for the in-class references!
    // Countdowns currently not working.
    let timeConverted = moment(time, "HH:mm").subtract(1, "years");
    let currentTime = moment().format("hh:mm");
    let timeDiff = moment().diff(moment(timeConverted), "minutes");
    //Time between trains
    let tRemaining = timeDiff % frequency;
    //Calculates minutes until next train
    let tMinutesTillTrain = frequency - tRemaining;
    //Calculates time of next train
    let nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm:ss");
    //Adding the data to firebase
    database.ref("/trains").set({
        trainName: train,
        trainDestination: destination,
        firstTrain: time,
        trainFrequency: frequency,
        currentTime: currentTime,
        timeDifference: timeDiff,
        timeBetween: tRemaining,
        minutesLeft: tMinutesTillTrain,
        nextTrain: nextTrain,
        // Add timestamp?
    })

});


//pulls new info from firebase, adds it to new rows in my table
database.ref("/trains").on("value", function (snapshot) {
    let newRow = $("<tr>");
    let tName = $("<td>").text(snapshot.val().trainName);
    tName.attr("scope", "row");
    let tDestination = $("<td>").text(snapshot.val().trainDestination);
    let tFrequency = $("<td>").text(snapshot.val().trainFrequency);
    let nextArrival = $("<td>").text(snapshot.val().nextTrain);
    let minutesAway = $("<td>").text(snapshot.val().minutesLeft);
    newRow.append(tName);
    newRow.append(tDestination);
    newRow.append(tFrequency);
    newRow.append(nextArrival);
    newRow.append(minutesAway);
    $(".tableRow").append(newRow);
});