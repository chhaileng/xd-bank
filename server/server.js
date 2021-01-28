const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const db = require('./db');

const app = express();

const BUILD_PATH = path.join(__dirname, '../build');
const ONE_HOUR_MS = 1000 * 60 * 60;

app.use(express.static(BUILD_PATH));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  secret: 'xd Bank 16239487619868(^(*^(*%7&$^$',
  name: 'xd-bank',
  resave: true,
  saveUninitialized: true,
  rolling: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: ONE_HOUR_MS
  }
}));

require('./passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Middleware
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).end();
}

app.get('/user', (req, res) => {
  res.status(200).json(req.isAuthenticated() ? req.user : null)
});

app.get('*', (req, res) => {
  res.sendFile(path.join(BUILD_PATH, 'index.html'));
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err || !user) {
      return res.status(400).end();
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(400).end();
      }
      req.session.save(() => {
        res.status(301).redirect('/');
      })
    });
  })(req, res, next);
});

app.post('/logout', isAuthenticated, (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(301).redirect('/');
});

app.post('/transfer', isAuthenticated, (req, res) => {
  const { amount, remark, username } = req.body;
  const floatAmount = parseFloat(amount);
  if (
    isNaN(floatAmount) ||
    floatAmount <= 0 ||
    remark == null ||
    remark == '' ||
    username == null ||
    username == ''
  ) {
    return res.status(400).json({ error: "Invalid information!", success: false });
  }
  const authUser = req.user;
  if (username === authUser.username) {
    return res.status(401).json({ error: "You can't transfer to your own account!", success: false });
  }
  const resUser = db.transfer(authUser, amount, username, remark);
  if (resUser === false) {
    return res.status(401).json({ error: "You don't have enough balance!", success: false });
  }
  return res.status(200).json({ user: resUser, success: true });
});

// Check and remove account after 3 hours of login
setInterval(db.user.checkAndRemoveUsers, 5000);

const port = process.env.PORT || '8001';
app.listen(port);
console.log(`Server listening on port ${port}`);