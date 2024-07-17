import express from 'express';
import mongoose  from 'mongoose';
import bodyParser from 'body-parser';
import keys from './config/keys';
import passport from 'passport';
import users from './routes/api/users';
import passportUse from './config/passport';

const app = express();

// bodyparser plugin
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

// mongo db connect
mongoose.connect(keys.mongoURI)
  .then(() => console.log('DB connect'))
  .catch((err) => console.log('err:', err));

// passport
app.use(passport.initialize());
passportUse(passport);
// 使用 routers users
app.use('/api/users', users);

const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
