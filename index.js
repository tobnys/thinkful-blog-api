// Main pointers
const express = require("express");
const app = express();

const morgan = require("morgan");

const {BlogPosts} = require("./models");

// Routes
const blogRouter = require("./routes/blogRouter");

// Server logic
const cDate = new Date();
BlogPosts.create("testTitle1", "long string paragraph here", "test author 1", cDate);
BlogPosts.create("testTitle2", "long string paragraph here", "test author 2", cDate);
BlogPosts.create("testTitle3", "long string paragraph here", "test author 3", cDate);

app.use(morgan("common"));

app.use("/blog-posts", blogRouter);

let server;

function runServer() {
    const port = 8080;
    return new Promise((resolve, reject) => {
        server = app.listen(port, () => {
            console.log("app running from promise");
            resolve(server);
        }).on("error", err => {
            reject(err);
        });
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if(err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

if(require.main === module) {
    runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};