//REQUIREMENTS

const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });
const compression = require("compression");
const db = require("./utils/db");
const bc = require("./utils/bc");
const csurf = require("csurf");
var multer = require("multer");

var uidSafe = require("uid-safe");
var path = require("path");
const s3 = require("./utils/s3.js");
const cookieSession = require("cookie-session");

//MIDDLEWARE

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});
app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(require("body-parser").json());

app.use(compression());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(express.static("./public"));

// ROUTES

app.get("/friends-and-wannabes", async (req, res) => {
    try {
        let { rows } = await db.getFriendsAndWannabes(req.session.user.id);
        res.json({ rows });
    } catch (e) {
        console.log("err in GET /friends-and-wannabes: ", e.message);
    }
});

app.get("/last-users", async (req, res) => {
    try {
        let resp = await db.getLastUsers();
        res.json({ result: resp.rows });
    } catch (e) {
        console.log("err in GET /last-users: ", e.message);
    }
});

app.get("/user", (req, res) => {
    res.json(req.session.user);
});

app.get("/welcome", (req, res) => {
    if (req.session.login) res.redirect("/");
    else res.sendFile(__dirname + "/index.html");
});

app.get("/user/:id/json", async (req, res) => {
    try {
        const [userData, friendship, friends] = await Promise.all([
            db.getOtherUser(req.params.id),
            db.checkFriendship(req.params.id, req.session.user.id),
            db.getFriends(req.params.id)
        ]);
        friendship.rowCount > 0 && friendship.rows[0].accepted
            ? res.json({
                first: userData.rows[0].first,
                last: userData.rows[0].last,
                profile_pic: userData.rows[0].profile_pic,
                uid: userData.rows[0].uid,
                bio: userData.rows[0].bio,
                areFriends: true,
                friends: friends.rows
            })
            : res.json({
                first: userData.rows[0].first,
                last: userData.rows[0].last,
                profile_pic: userData.rows[0].profile_pic,
                uid: userData.rows[0].uid,
                bio: userData.rows[0].bio,
                areFriends: false,
                friends: false
            });
    } catch (e) {
        console.log("err in GET /user/:id/json", e.message);
    }
});

app.get("/find-users/:str/json", async (req, res) => {
    try {
        let result = await db.getUsersByName(req.params.str);
        res.json({ data: result.rows });
    } catch (e) {
        console.log("err in GET /find-users/:str...: ", e.message);
    }
});

//FRIENDSHIP BUTTON REQUESTS

app.get("/check-request/:id/json", async (req, res) => {
    let isSender, requestSent, friendship;
    isSender = requestSent = friendship = false;
    try {
        let resp = await db.checkFriendship(req.params.id, req.session.user.id);
        if (resp.rows[0].accepted == true) {
            friendship = isSender = requestSent = true;
        } else if (resp.rows[0].sender_id == req.session.user.id) {
            requestSent = true;
        } else if (resp.rows[0].sender_id == req.params.id) {
            isSender = true;
        }
        res.json({
            isSender: isSender,
            requestSent: requestSent,
            friendship: friendship
        });
    } catch (e) {
        console.log("err in GET /check-request/:id/json: ", e.message);
    }
});

app.get("/add-friend/:id/json", async (req, res) => {
    try {
        let resp = await db.insertFriendRequest(
            req.session.user.id,
            req.params.id
        );
        if (resp.rowCount == 1) {
            res.json({ result: true });
        } else {
            res.json({ result: false });
        }
    } catch (e) {
        console.log("err in GET /add-friend/:id/json: ", e.message);
    }
});

app.get("/accept-friend/:id/json", async (req, res) => {
    try {
        let resp = await db.acceptFriendRequest(
            req.session.user.id,
            req.params.id
        );
        if (resp.rowCount == 1) {
            res.json({ result: true });
        } else {
            res.json({ result: false });
        }
    } catch (e) {
        console.log("err in GET /accept-friend/:id/json: ", e.message);
    }
});

app.get("/end-friendship/:id/json", async (req, res) => {
    try {
        await db.denyFriendship(req.session.user.id, req.params.id);
        res.sendStatus(204);
    } catch (e) {
        console.log("err in end-friendship route", e.message);
    }
});

app.get("*", function(req, res) {
    if (!req.session.login) res.redirect("/welcome");
    else res.sendFile(__dirname + "/index.html");
});

app.post("/register", async (req, res) => {
    const { first, last, email, password } = req.body;
    try {
        let hash = await bc.hashPassword(password);
        let id = await db.addUser(first, last, email, hash);
        req.session.login = true;
        req.session.user = {
            first: req.body.first,
            last: req.body.last,
            email: req.body.email,
            id: id.rows[0].id
        };
        res.json({ success: true });
    } catch (e) {
        console.log("err in POST /register: ", e.message);
    }
});

app.post("/login", async (req, res) => {
    try {
        let find = await db.checkLogin(req.body.email);
        let check = await bc.checkPassword(
            req.body.password,
            find.rows[0].password
        );
        if (check) {
            req.session.login = true;
            const { first, last, email, id } = find.rows[0];
            req.session.user = {
                first: first,
                last: last,
                email: email,
                id: id
            };
            if (find.rows[0].bio) {
                req.session.user.bio = find.rows[0].bio;
            }
            if (find.rows[0].profile_pic) {
                req.session.user.image = find.rows[0].profile_pic;
            }
            res.json({ success: true });
        }
    } catch (e) {
        res.sendStatus(500);
        console.log("err in POST /login: ", e.message);
    }
});

app.post("/picture", uploader.single("file"), s3.upload, async (req, res) => {
    if (req.file) {
        try {
            let url =
                "https://s3.amazonaws.com/spicedling/" + req.file.filename;
            await db.addPic(url, req.session.user.id);
            req.session.user.image = url;
            res.json({ url: url });
        } catch (e) {
            console.log("err in POST /picture: ", e.message);
        }
    }
});

app.post("/bio", async (req, res) => {
    try {
        let bio = req.body.bio;
        await db.addBio(bio, req.session.user.id);
        req.session.user.bio = bio;
        res.json({ bio: bio });
    } catch (e) {
        console.log("err in POST /bio: ", e.message);
    }
});

server.listen(8080, function() {
    console.log("I'm listening.");
});

//SERVER SIDE SOCKET CODE

io.on("connection", async function(socket) {
    // console.log(`socket with the id ${socket.id} is now connected`);
    if (!socket.request.session.user.id) {
        return socket.disconnect(true);
    }

    // const userId = socket.request.session.user.id;

    let lastChats = await db.getChatMessages();
    socket.emit("chatMessages", { lastChats: lastChats.rows.reverse() });

    socket.on("chatMessage", async newMessage => {
        try {
            let { first, last, id, image } = socket.request.session.user;
            let data = await db.insertChat(newMessage, first, last, id, image);
            io.sockets.emit("newChat", data.rows[0]);
        } catch (e) {
            console.log("err in SOCKET.on chatMessage: ", e.message);
        }
    });
});
