const express = require("express");
const router = express.Router();
const User = require("../../models/User");

router.get("/test", (req,res) => {
  res.json({msg: "login works"})
});

router.post("/register", (req,res) => {
  console.log(req.body);
  User.findOne({email:req.body.email})
    .then((user) => {
      if (user) {
        return res.status(400).json({email: "已存在"})
      } else {
        const newUser = new User({


        })
      }
    })
})
module.exports = router;