//////SHUT UP LINTER
var spicedPg = require("spiced-pg");
var db = spicedPg("postgres:postgres:asus@localhost:5432/socialnetwork");

exports.addUser = function(first, last, email, password) {
    return db.query(
        `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id`,
        [first, last, email, password]
    );
};

exports.checkLogin = function(email) {
    return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
};

exports.addPic = function(url, id) {
    return db.query(`UPDATE users SET profile_pic = $1 WHERE id = $2`, [
        url,
        id
    ]);
};
