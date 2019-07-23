const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db");
const bc = require("./utils/bc");
// const csurf = require("csurf");

app.use(
    require("cookie-session")({
        secret: "All my friends are nice",
        maxAge: 1000 * 60 * 60 * 24 * 365
    })
);

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
    if (req.session.login) res.redirect("/");
});

app.get("*", function(req, res) {
    if (!req.session.login) res.redirect("/welcome");
    else res.redirect("/");
    // res.sendFile(__dirname + "/index.html");
});

app.post("/register", (req, res) => {
    console.log(req.body);
    db.addUser(req.body.first, req.body.last, req.body.email, req.body.password)
        .then(resp => {
            req.session.user = {
                first: req.body.first,
                last: req.body.last,
                email: req.body.email
            };
            req.session.login = true;
            // res.sendStatus(204);
            res.redirect("/");
        })
        .catch(err => console.log("err: ", err));
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
