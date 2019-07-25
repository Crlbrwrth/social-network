const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db");
const bc = require("./utils/bc");
const csurf = require("csurf");
var multer = require("multer");
const s3 = require("./utils/s3.js");
var uidSafe = require("uid-safe");
var path = require("path");

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

app.use(
    require("cookie-session")({
        secret: "All my friends are nice",
        maxAge: 1000 * 60 * 60 * 24 * 365
    })
);

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(require("body-parser").json());

// app.use(csurf());
// app.use(function(req, res, next) {
//     res.set("x-frame-options", "deny");
//     res.locals.csrfToken = req.csrfToken();
//     next();
// });

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

app.get("/user", (req, res) => {
    res.json(req.session.user);
});

app.get("/welcome", (req, res) => {
    console.log("welcome");
    if (req.session.login) res.redirect("/");
    else res.sendFile(__dirname + "/index.html");
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
        console.log("err in post register route", e.message);
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
                req.session.user.profile_pic = find.rows[0].profile_pic;
            }
            res.json({ success: true });
        }
    } catch (e) {
        res.sendStatus(500);
        console.log("err in post login route", e.message);
    }
});

app.post("/picture", uploader.single("file"), s3.upload, async (req, res) => {
    if (req.file) {
        let url = "https://s3.amazonaws.com/spicedling/" + req.file.filename;
        await db.addPic(url, req.session.user.id);
    }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
