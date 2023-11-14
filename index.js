const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();
require('./config/mongoose');
require('./config/upload');

const { APP_PORT } = require('./config');
const upload = require('./config/upload');

const signupRoute = require('./routes/signup');
const signinRoute = require('./routes/signin');
const signoutRoute = require('./routes/signout');
const tokenRoute = require('./routes/token');
const postRoute = require('./routes/post');
const commentRoute = require('./routes/comment');

const app = express();

app.use(cors());
app.set('json spaces', 2);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/signup", upload.single("avatar"), signupRoute);
app.use("/signin", signinRoute);
app.use("/signout", signoutRoute);
app.use("/token", tokenRoute);
app.use("/post", postRoute);
app.use("/comment", commentRoute);

app.listen(APP_PORT, (err)=>{
    if(err){
        console.log("Error while running server",err);
    }
    console.log("Server is up and running on port:", APP_PORT);
});

