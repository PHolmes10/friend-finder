var mysql = require("mysql");

var connection;
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection('mysql://o7lzlvsj6z2g6f6z:bth9zwwecm4qa3tl@s554ongw9quh1xjs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/vp82io1bbdx8hi5r');
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
    console.log("Connected as id: " + connection.threadId);
});

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        connection.query("SELECT * FROM profiles", function (err, result) {
            if (err) throw err;
            var data = JSON.stringify(result);
            data = JSON.parse(data);
            for (i = 0; i < data.length; i++) {
                data[i].scores = data[i].scores.split(",").map(Number);
            }
            return res.json(data);

        });
    });

    app.post("/api/friends", function (req, res) {
        var user = (req.body.scores).join();
        connection.query("SELECT * FROM profiles", function (err, stuffWeGotBack) {
            var match = {
                matchName: "",
                matchPhoto: "",
                difference: 100
            }

            var saveTotal = 0

            for (var i = 0; i < req.body.scores.length; i++) {
                saveTotal += parseInt(req.body.scores)
            }


            var closestDifference = 10000
            for (var k = 0; k < stuffWeGotBack.length; k++) {
                var difference = saveTotal - stuffWeGotBack[k].totalscore
                if (Math.abs(difference) < closestDifference) {
                    match = stuffWeGotBack[k]
                }
            }

            res.json(match)
        })

        var saveTotal = 0

        for (var i = 0; i < req.body.scores.length; i++) {
            saveTotal += parseInt(req.body.scores)
        }

        connection.query("INSERT INTO profiles (name, photo, totalscore) VALUES (?, ?, ?)", [req.body.name, req.body.photo, saveTotal]);

    });
};
