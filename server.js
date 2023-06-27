const express = require("express");
const mongoose  = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
const users = require("./routes/api/users");


const app = express();
// bodyparser plugin
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

mongoose.connect(keys.mongoURI)
  .then(() => console.log("DB connect"))
  .catch((err) => console.log("err:", err))

app.get("/", (req, res) => {
  res.send("Hello world");
})

app.use("/api/users", users)

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})