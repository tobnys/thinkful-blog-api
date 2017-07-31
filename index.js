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

app.listen(8080, () => console.log("Running on port 8080"));