var spicedPg = require("spiced-pg");
var db = spicedPg("postgres:postgres:asus@localhost:5432/socialnetwork");

// FRIENDS PAGE

exports.getFriendsAndWannabes = function(user_id) {
    return db.query(
        `SELECT users.id AS uid, first, last, profile_pic, accepted
        FROM users
        JOIN friends
        ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)`,
        [user_id]
    );
};

exports.getFriends = function(user_id) {
    return db.query(
        `SELECT users.id AS uid, first, last, profile_pic
        FROM users
        JOIN friends
        ON (accepted = true AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)
        `,
        [user_id]
    );
};

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

exports.addBio = function(bio, id) {
    return db.query(`UPDATE users SET bio = $1 WHERE id = $2`, [bio, id]);
};

exports.getOtherUser = function(id) {
    return db.query(
        `SELECT first, last, profile_pic, bio, id FROM users WHERE id = $1`,
        [id]
    );
};

exports.getLastUsers = function() {
    return db.query(
        `SELECT first, last, profile_pic FROM users ORDER BY id DESC LIMIT 5`
    );
};

exports.getUsersByName = function(str) {
    return db.query(
        `SELECT first, last, profile_pic FROM users WHERE first ILIKE $1;`,
        [str + "%"]
    );
};

// FRIENDSHIP BUTTON

exports.insertFriendRequest = function(sender_id, receiver_id) {
    return db.query(
        `INSERT INTO friends (sender_id, receiver_id, accepted) VALUES ($1, $2, false)`,
        [sender_id, receiver_id]
    );
};

exports.acceptFriendRequest = function(sender_id, receiver_id) {
    return db.query(
        `UPDATE friends SET accepted = true WHERE sender_id = $2 AND receiver_id = $1`,
        [sender_id, receiver_id]
    );
};

exports.denyFriendship = function(sender_id, receiver_id) {
    return db.query(
        `DELETE FROM friends WHERE
        (sender_id = $1 AND receiver_id = $2)
        OR
        (sender_id = $2 AND receiver_id = $1)`,
        [sender_id, receiver_id]
    );
};

exports.checkFriendship = function(sender_id, receiver_id) {
    return db.query(
        `SELECT * FROM friends
        WHERE (sender_id = $1 AND receiver_id = $2)
        OR (sender_id = $2 AND receiver_id = $1)`,
        [sender_id, receiver_id]
    );
};

// CHAT

exports.insertChat = function(chat_text, f, l, id, profile_pic) {
    return db.query(
        `INSERT INTO chat
        (chat_text, first, last, user_id, profile_pic)
        VALUES ($1, $2, $3, $4, $5)`,
        [chat_text, f, l, id, profile_pic]
    );
};

exports.getChatMessages = function() {
    return db.query(`SELECT * FROM chat ORDER BY id DESC LIMIT 10`);
};
