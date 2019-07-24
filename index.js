const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db");
const bc = require("./utils/bc");
const csurf = require("csurf");

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

app.get("/getAnimal", (req, res) => {
    res.json({
        name: "Zebra",
        cutenessScore: "pretty cute"
    });
});

app.get("/welcome", (req, res) => {
    console.log("welcome");
    if (req.session.login) res.redirect("/");
    else res.sendFile(__dirname + "/index.html");
});

app.get("*", function(req, res) {
    console.log("**");
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
            res.json({ success: true });
        }
    } catch (e) {
        res.sendStatus(500);
        console.log("err in post login route", e.message);
    }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
