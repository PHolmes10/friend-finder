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
        var user = (req.body.scores).join();
        // console.log(scores);
        connection.query("SELECT * FROM profiles", function (err, res) {
            var data = JSON.stringify(res);
            data = JSON.parse(data);
            // console.log(data)
            // var match = {
            //     matchName:  "",
            //     matchPhoto:  "",
            //     difference: 100
            // }
            
            var difference = 0;

            for (i = 0; i < data.length; i++) {
                // console.log(data)
                for (j = 0; j < data[i].scores.length; j++) {
                    // console.log(j);
                    difference = Math.abs(data[i].scores[j] - user[j]);
                    console.log(difference);
                };
                
            }
        })

        connection.query("INSERT INTO profiles (name, photo, scores) VALUES (?, ?, ?)", [req.body.name, req.body.photo, req.body.scores.join()]);

    });
};
