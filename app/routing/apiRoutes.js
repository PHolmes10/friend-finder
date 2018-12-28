var mysql = require("mysql");

var connection;
if (process.env.JAWSDB_URL) {
connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "friendFinder_db"
});
}

connection.connect(function(err) {
if (err) {
  console.error("error connecting: " + err.stack);
} 
// connection.query("SELECT * FROM profiles")
});
module.exports = function(app){
app.get("/api/friends", function (req, res) {
    return res.json(friends);
});

// app.post("/api/tables", function (req, res) {
//     // // req.body hosts is equal to the JSON post sent from the user
//     // var newReservation = req.body;

//     // if (reservations.length < 5) {
//     //     reservations.push(newReservation);
//     //     res.json(newReservation);
//     // } else {
//     //     waitList.push(newReservation);
//     //     res.json(null)
//     // }
// });
};


function loadProfiles() {
    // Selects all of the data from the MySQL profiles table
    connection.query("SELECT * FROM profiles", function(err, res) {
      if (err) throw err;
      //a fun trick for converting mysql's returned 'rowPacketData' obj into more usable JSON
      var data = JSON.stringify(res);
      data = JSON.parse(data);
      // loop over your data converting the string of numbers into an array (using split??)
      friends = data;
    });
  }