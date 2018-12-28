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

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
    }
    // connection.query("SELECT * FROM profiles")
});
module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        connection.query("SELECT * FROM profiles", function (err, result) {
            if (err) throw err;
            var data = JSON.stringify(result);
            data = JSON.parse(data);
            for (i = 0; i < data.length; i++) {
                data[i].scores = data[i].scores.split(",").map(Number);
                console.log(data[i].scores);
            }
            return res.json(data);

            
        });

    });

    // app.post("/api/friends", function (req, res) {
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
    connection.query("SELECT * FROM profiles", function (err, res) {
        if (err) throw err;

        var data = JSON.stringify(res);
        data = JSON.parse(data);
        // loop over your data converting the string of numbers into an array (using split??)
        friends = data;
    });
}