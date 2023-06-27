const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../../models/user");
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
          name: req.body.name,
          email: req.body.email,
          avatar: req.body?.avatar || "",
          password: req.body.password
        });

        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          });
        });
      }
    })
  // ----------------
})
module.exports = router;