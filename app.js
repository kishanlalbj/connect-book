const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const port = process.env.PORT || 3000;
const db = require("./server/config/keys").mongoURI;
const users = require("./server/routes/api/users");
const profiles = require("./server/routes/api/profiles");
const posts = require("./server/routes/api/posts");

var app = express();
// Connect to database
mongoose
  .connect(db)
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

//Middlewares
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(passport.initialize());

//passport middlewares
require("./server/config/passport")(passport);

// Use routes
app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);

// Start server
app.listen(port, (err, server) =>
  console.log(`server started in port ${port}`)
);
