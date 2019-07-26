//this is s3.js

const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../secrets"); //in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.awsKey,
    secretAccessKey: secrets.awsSecret
});

exports.upload = (req, res, next) => {
    const { file } = req;
    if (!file) {
        console.log("Multer failed");
        return res.sendStatus(500);
    }
    const { filename, mimetype, size, path } = req.file;

    s3.putObject({
        Bucket: "spicedling",
        ACL: "public-read",
        Key: filename,
        Body: fs.createReadStream(path),
        ContentType: mimetype,
        ContentLength: size
    })
        .promise()
        .then(data => {
            // fs.promises.unlink(path);
            console.log("data: ", data);
            next();
        })
        .catch(err => {
            // fs.promises.unlink(path);
            console.log("err", err);
            res.sendStatus(500);
        });
};
