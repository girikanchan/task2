const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
app.use(express.json())
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors())
app.use(cookieParser())
// Serve static files
app.use(express.static('./style'));
app.use(express.static('./asset'));
app.use(express.static('./javascript'));

app.set( 'view engine', 'ejs' );
app.set('views', './template');

const userRoutes = require('./routes/users');

// Use the user routes
app.use('/', userRoutes);

app.get("/register",(req,res) => {
    res.render("register");
});

app.get("/login",(req,res) => {
    res.render("index");
    res.setHeader('Content-Type','text/html');  
});


app.get("/profile",(req,res) => {
    res.render("profile");
});

app.get("/update",(req,res) => {
    res.render("forgetpass");
});


app.get("/seepost",(req,res) => {
    res.render("userspost");
});
app.get("/addpost",(req,res) => {
    res.render("profile");
});
app.get("/logout",(req,res) => {
    res.render("logout");
});

app.get("/likes",(req,res) => {
    res.render("userspost");
});


app.get("/comment",(req,res) => {
    res.render("comments");
});

app.get("/seeComments",(req,res) => {
    res.render("comments");
});

app.get("/searchprofile",(req,res) => {
    res.render("profile");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
