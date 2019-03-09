// Do I need document ready anymore?  It seems as though its been weeded out of most exercises


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


// When adding trains, administrators should be able to submit the following:
// Train Name
// Destination 
// First Train Time -- in military time
// Frequency -- in minutes
// Code this app to calculate when the next train will arrive; this should be relative to the current time.
// Users from many different machines must be able to view same train times
