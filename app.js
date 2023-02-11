//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Keep a daily journal to have a neutral space to express yourself, get to know yourself better and observe yourself, and follow your progress and realize how far you’ve come. Set your journal up in Notion to have it at hand without even taking up any space. Find the information you are looking for easily and quickly thanks to a database, and use a template to generate your journal entry in one click and take action immediately..Writing your pent-up feelings down could also prevent you from accidentally unleashing them on someone else. The lack of face-to-face contact in a remote working situation means problems are more likely to escalate as messages can come across bluntly. Instead of sending your frustrations via email, put them in your work journal. Once you write them down, you may find that your head feels clearer, and you can move on with your day.";
const aboutContent = "The Daily Planner Standard Edition provides all the features needed in a daily planner. Included in the planner is a year overview page that includes the previous and next year, dated monthly pages for each month, dated Weekly pages, dated Daily Planning and Daily Journal Pages, a Notes Section with a lined Journal Page..We all have bad days. And, more often than not, a bad day also means a lack of concentration and low productivity. But what if you have a looming deadline? Work through your negative thoughts by writing them in your productivity journal. If you’re feeling sad, frustrated, or overwhelmed, having an outlet to express yourself can be therapeutic. Many people will tell you that they feel a lot better as soon as they get their emotions off their chest. ";
const contactContent = "A journal is an excellent place for you to keep lists of more immediate tasks. Maybe you’re applying to graduate school and have a list of essays to write. Maybe you’re looking for a new job and need to update your resume. Or maybe you’re planning to start a blog and have a list of things you need to do to get started. Whatever you have on your plate, writing these tasks down in a productivity journal can help you accomplish them..Writing your pent-up feelings down could also prevent you from accidentally unleashing them on someone else. The lack of face-to-face contact in a remote working situation means problems are more likely to escalate as messages can come across bluntly. Instead of sending your frustrations via email, put them in your work journal. Once you write them down, you may find that your head feels clearer, and you can move on with your day.";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [];

app.get("/", (req, res) => {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
});

app.get("/about", (req, res) => {
  res.render("about", { startingContent: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { startingContent: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
})


app.get("/posts/:postName", (req, res) => {
  // const requestedTitle = _.lowerCase(req.params.postName);
  const requestedTitle = _.lowerCase([req.params.postName]);
  
  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);
    
    if (storedTitle === requestedTitle) {
     res.render("post",{
      title:post.title,
      content:post.content
     })
      
    }
  });
});

app.post("/compose", function (req, res) {
  // console.log(req.body.postTitle);
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
