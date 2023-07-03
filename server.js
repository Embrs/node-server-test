const express = require("express");
const mongoose  = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
const users = require("./routes/api/users");
const passport = require("passport");


const app = express();

// bodyparser plugin
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

// mongo db connect
mongoose.connect(keys.mongoURI)
  .then(() => console.log("DB connect"))
  .catch((err) => console.log("err:", err))

// passport
app.use(passport.initialize());
require("./config/passport")(passport)

// 使用 routers users
app.use("/api/users", users)

const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})