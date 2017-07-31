const express = require("express");
const router = express.Router();

const {BlogPosts} = require("../models");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

router.get("/", jsonParser, (req, res) => {
    res.send(BlogPosts.get());
});

router.post("/", jsonParser, (req, res) => {
    const cDate = new Date();
    const requiredFields = ["title", "content", "author"];
    for(var i = 0; i < requiredFields.length; i++) {
        var field = requiredFields[i];
        if(!(field in req.body)) {
            console.error(`Field ${field} empty in request body`)
            return res.status(204);
        }
    }
    BlogPosts.create(req.body.title, req.body.content, req.body.author, cDate);
    return res.status(200).send("OK");
});

router.delete("/:id", jsonParser, (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Post ${req.params.id} was deleted.`)
    return res.status(200);
});

router.put("/:id", jsonParser, (req, res) => {
    const requiredFields = ["title", "content", "author", "publishDate"];
    for(var i = 0; i < requiredFields.length; i++) {
        var field = requiredFields[i];
        if(!(field in req.body)) {
            console.error(`Field ${field} empty in request body`)
            return res.status(204);
        }
    }
    if(req.params.id !== req.body.id) {
        console.error("ID not matching");
        return res.status(400).send("ID not matching");
    }
    const cDate2 = new Date();
    BlogPosts.update({
        id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        publishDate: cDate2
    })
});

module.exports = router;