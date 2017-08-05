var chai = require("chai");
var should = require("chai").should();
const chaiHttp = require('chai-http');

var {app, runServer, closeServer} = require("../index.js");

chai.use(chaiHttp);

describe("Blog Posts", function() {

    before(function() {
        return runServer();
    });

    after(function() {
        return closeServer();
    });


    it("should return a list of posts on GET", function() {
        return chai.request(app).get("/blog-posts").then(function(res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.length.should.be.above(0);
            res.body.forEach(function(i) {
                i.should.be.a('object');
                i.should.have.all.keys("id", "title", "content", "author", "publishDate");
            });
        });
    });

    it("should create an item on POST", function() {
        const newPost = {
            title: "sampleTitle",
            content: "sampleContent",
            author: "sampleAuthor"
        };
        const expectedKeys = ["id", "title", "content", "author", "publishDate"];

        return chai.request(app).post("/blog-posts").send(newPost).then(function(res) {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a("object");
            res.body.should.have.all.keys(expectedKeys);
            res.body.title.should.equal(newPost.title);
            res.body.content.should.equal(newPost.content);
            res.body.author.should.equal(newPost.author);
        });
    });

    it("should update an item on PUT", function() {
        let newID;
        return chai.request(app).get("/blog-posts").then(function(res) {
            const newPost = Object.assign(res.body[0], {
                title: "sampleTitleU",
                content: "sampleContentU"
            });

            newID = res.body[0].id;

            return chai.request(app).put(`/blog-posts/${newID}`).send(newPost).then(function() {
                res.should.have.status(204);    
                res.body.title.should.equal(newPost.title);
                res.body.content.should.equal(newPost.content);
            });
        });
    });

    it('should delete posts on DELETE', function() {
        return chai.request(app)
      // first have to get
        .get('/blog-posts')
        .then(function(res) {
            return chai.request(app)
            .delete(`/blog-posts/${res.body[0].id}`)
            .then(function(res) {
            res.should.have.status(204);
          });
      });
  });

});