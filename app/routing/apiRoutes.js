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
        // console.log('we got the route!!!', req.body)
        var user = (req.body.scores).join();
        // console.log(scores);
        connection.query("SELECT * FROM profiles", function (err, stuffWeGotBack) {

            // console.log('we got this back from DB!!', stuffWeGotBack);
            // var data = JSON.stringify(stuffWeGotBack);
            // data = JSON.parse(data);
            // console.log(data)
            var match = {
                matchName: "",
                matchPhoto: "",
                difference: 100
            }

            var saveTotal = 0

            for (var i = 0; i < req.body.scores.length; i++) {
                saveTotal += parseInt(req.body.scores)
            }
            // console.log('this is our saveTotal', saveTotal);


            var closestDifference = 10000
            for (var k = 0; k < stuffWeGotBack.length; k++) {
                console.log('new dude total', saveTotal)
                console.log('compare dude totatl', stuffWeGotBack[k].totalscore);
                var difference = saveTotal - stuffWeGotBack[k].totalscore
                if (Math.abs(difference) < closestDifference) {
                    match = stuffWeGotBack[k]
                }
            }

            // res.json(match)
            // var difference = 0;

            // for (i = 0; i < data.length; i++) {
            //     // console.log(data)
            //     for (j = 0; j < data[i].scores.length; j++) {
            //         // console.log(data[i].scores);
            //         difference = Math.abs(data[i].scores[j] - user[j]);
            //         // console.log(difference);
            //     };

            // }
            res.json(match)
        })

        var saveTotal = 0

        for (var i = 0; i < req.body.scores.length; i++) {
            saveTotal += parseInt(req.body.scores)
        }
        console.log('this is our saveTotal down right before we save', saveTotal);

        connection.query("INSERT INTO profiles (name, photo, totalscore) VALUES (?, ?, ?)", [req.body.name, req.body.photo, saveTotal]);

    });
};
