const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const homeStartingContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam fugit nesciunt quam. Tenetur, error? Illo, magnam deleniti velit perspiciatis a expedita pariatur facere at nemo. Facilis, est rerum magnam reiciendis atque hic debitis laborum ad quo aliquid sed. Nemo perferendis debitis praesentium sequi consectetur mollitia nam quis animi magni magnam."; 
const aboutContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, voluptates quae aspernatur vero ex obcaecati suscipit porro rerum dolor sed nostrum quas cupiditate vitae accusamus quidem eum a totam temporibus tempore! A sequi facere veniam aliquam ducimus velit molestias quia necessitatibus quod nemo nobis sed, laudantium, ex ea! Quo doloremque culpa repellat sapiente perferendis, ab iure nesciunt numquam cupiditate mollitia consequatur provident harum quaerat accusantium sunt quisquam maxime necessitatibus ipsa sed at aliquam, quas alias. Ipsa necessitatibus labore rerum quas rem iure vitae! Fugit magnam nihil obcaecati iure debitis quae dicta voluptatum, deserunt, eligendi suscipit itaque voluptatem labore animi minus!" ;
const contactContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, voluptates quae aspernatur vero ex obcaecati suscipit porro rerum dolor sed nostrum quas cupiditate vitae accusamus quidem eum a totam temporibus tempore! A sequi facere veniam aliquam ducimus velit molestias quia necessitatibus quod nemo nobis sed, laudantium, ex ea! Quo doloremque culpa repellat sapiente perferendis, ab iure nesciunt numquam cupiditate mollitia consequatur provident harum quaerat accusantium sunt quisquam maxime necessitatibus ipsa sed at aliquam, quas alias. Ipsa necessitatibus labore rerum quas rem iure vitae! Fugit magnam nihil obcaecati iure debitis quae dicta voluptatum, deserunt, eligendi suscipit itaque voluptatem labore animi minus!";

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var posts = [];
app.get("/",function(req,res){
    res.render("home",{homeStartingContent: homeStartingContent, posts: posts});
})
app.get("/contact",function(req,res){
    res.render("contact",{contactStartingContent: contactContent});
})
app.get("/about",function(req,res){
    res.render("about",{aboutStartingContent: aboutContent});
})
app.get("/compose",function(req,res){
    res.render("compose");
})

app.get("/post/:postName",function(req,res){
    posts.forEach(function(post){
        var interestedPost = req.params.postName;
        if(_.lowerCase(interestedPost) === _.lowerCase(post.postTitle)){
            res.render("post", {postTitle: post.postTitle, postBody: post.postBody});
        }
    })
})
app.post("/",function(req,res){
    const post = {
        postTitle: req.body.postTitle,
        postBody: req.body.postBody
    };
    posts.push(post);
    res.redirect("/");
})
app.listen(3000,function(){
    console.log("Server is running at port 3000");
})
