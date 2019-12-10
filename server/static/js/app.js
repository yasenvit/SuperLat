// replace these values with those generated in your TokBox Account
//CHANGES STARTPOINT IS HERE 
// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}
let userlist = []
// (optional) add server code here
// initializeSession();
//random generator
function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min))
}
let connectionCount = 0;
let session = OT.initSession(apiKey, sessionId);
let numb = generateRandomInteger(2, 9)
let divname = 'subscriber'

// counting code-------------------------------------
session.on("connectionCreated", function (event) {
  connectionCount++;
  displayConnectionCount();
  console.log("connectionCount inside after creating", connectionCount)
});
session.on("connectionDestroyed", function (event) {
  connectionCount--;
  displayConnectionCount();
  console.log("connectionCount inside after distroying", connectionCount)
});
function displayConnectionCount() {
  document.getElementById("connectionCountField").value = connectionCount.toString();
}
//----------------------------------------------------

// Subscribe to a newly created stream
session.on('streamCreated', function (event) {
  let username = divname + String(connectionCount)
  console.log("username", username)
  session.subscribe(event.stream, username, {
    name: "Hanna",
    style: { nameDisplayMode: "on" },
    insertMode: 'append',
    width: '100%',
    height: '100%',
    // resolution: '170x270',
    frameRate: 15
  }, handleError);
});

// Create a publisher
let publisher = OT.initPublisher('subscriber1', {
  name: "John",
  style: { nameDisplayMode: "on" },
  insertMode: 'append',
  width: '100%',
  height: '100%',
  // resolution: '170x270',
  frameRate: 15

}, handleError);

// Connect to the session
session.connect(token, function (error) {
  // If the connection is successful, initialize a publisher and publish to the session
  if (error) {
    handleError(error);
  } else {
    session.publish(publisher, handleError);
  }
});
// function initializeSession() {


//     return session
// }
