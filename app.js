const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const lodash = require('lodash')

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const blogs = [];

app.get("/",function(req,res) {
    res.render("home",{blogsList:blogs});
});

app.get("/about",function(req,res) {
    res.render("about")
});

app.get("/contact",function(req,res) {
    res.render("contact")
});

app.get("/compose",function(req,res) {
    res.render("compose")
});

app.post("/compose",function(req,res) {
    var blog  = {
        title: req.body.title,
        blogtext: req.body.textarea
    }
    blogs.push(blog)
    res.redirect("/");
})


app.get("/posts/:title",function(req,res) {
    const blogTitle  = lodash.lowerCase(req.params.title);

    blogs.forEach(function(post){
        const storedTitle  = lodash.lowerCase(post.title);
        if( storedTitle === blogTitle) {
            res.render("posts",{blogTitle:post})
        }
    })
})


app.listen(3000, function () { console.log("Server up and running") });