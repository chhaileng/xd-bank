// We're just going to fake having a db and store everything in memory :)
// This also gives us the benefit of everything happening synchronously!
const crypto = require('crypto');

const randomHash = () => crypto.randomBytes(10).toString('hex');
// username -> user
const users = {};

// session ID -> username
const sessions = {};

// Returns the session ID
function handleLogin(username, password) {
  const sessionID = randomHash();

  users[username] = {
    username,
    balance: 10000,
    transactions: [
      {
        amount: 10000,
        username: 'xd_bank',
        remark: 'Initial Balance :)',
        balance: 10000
      }
    ],
  };
  sessions[sessionID] = username;

  return sessionID;
}

function logout(sessionID) {
  delete sessions[sessionID]
}

function getUser(sessionID) {
  // console.log(sessions, users)
  return users[sessions[sessionID]];
}

// Returns the updated user, or false on failure.
function makeTransfer(user, amount, username, remark) {
  if (user.balance < amount) {
    return false;
  }
  
  const { transactions } = user;
  user.balance -= amount;
  transactions.push({ amount: -amount, remark, username, balance: user.balance });
  return user;
}

module.exports = {
  handleLogin,
  logout,
  getUser,
  makeTransfer,
};
