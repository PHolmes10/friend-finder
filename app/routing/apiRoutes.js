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
  //once successfully connected, you may want to query your database for the info you'll need later!
}
});

app.get("/api/tables", function (req, res) {
    // return res.json(reservations);
});

app.post("/api/tables", function (req, res) {
    // // req.body hosts is equal to the JSON post sent from the user
    // var newReservation = req.body;

    // if (reservations.length < 5) {
    //     reservations.push(newReservation);
    //     res.json(newReservation);
    // } else {
    //     waitList.push(newReservation);
    //     res.json(null)
    // }
});
