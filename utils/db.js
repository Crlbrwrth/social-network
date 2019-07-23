//////SHUT UP LINTER
var spicedPg = require("spiced-pg");
var db = spicedPg("postgres:postgres:asus@localhost:5432/socialnetwork");

exports.addUser = function(first, last, email, password) {
    return db.query(
        `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4)`,
        [first, last, email, password]
    );
};
