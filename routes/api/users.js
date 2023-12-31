const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // 加密
const gravatar = require("gravatar"); // 頭像
const jwt = require("jsonwebtoken"); // token
const passport = require("passport")

const keys = require("../../config/keys");
const User = require("../../models/user");

passport.initialize()

// $route POST api/users/register
// @desc Create user
// @access public
router.post("/register", (req,res) => {
  console.log(req.body);
  User.findOne({email:req.body.email})
    .then((user) => {
      if (user) {
        res.status(400).json({email: "已存在"})
        return;
      } 
      const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        identity: req.body.identity
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
    })
})

// $route POST api/users/login
// @desc login
// @access public
router.post("/login", (req,res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email})
    .then( user => {
      if(!user) return res.status(404).json("查無用戶");
      // 密碼匹配
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const rule = {
            id:user.id,
            name: user.name,
            avatar: user.avatar,
            identity: user.identity
          };
          jwt.sign(rule, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
            if (err) throw err;
            res.json({
              success: true,
              token: `Bearer ${token}`
            })
          })
          return;
        };
        return res.status(400).json("帳號密碼錯誤")
      });
    })
})
// $route POST api/users/current
// @desc user info
// @access Private
router.get("/current", passport.authenticate("jwt", {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    identity: req.user.identity
  })
})
module.exports = router;