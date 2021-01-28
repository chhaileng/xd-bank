const users = {};

const THREE_HOUR_MS = 1000 * 60 * 60 * 3;

const user = {
  login: (username, password) => {
    const user = users[username.toLowerCase().trim()];
    if (user) {
      return user;
    } else {
      users[username] = {
        username,
        balance: 10000,
        account_expire_at: Date.now() + THREE_HOUR_MS,
        transactions: [
          {
            amount: 10000,
            username: 'xd_bank',
            remark: 'Initial Balance :)',
            balance: 10000
          }
        ],
      };
      return users[username];
    }
  },
  findUser: (username) => {
    return users[username.toLowerCase().trim()] || null
  },
  checkAndRemoveUsers: () => {
    for (let username in users) {
      if(users.hasOwnProperty(username)) {
        const now = Date.now();
        const account_expire_at = users[username].account_expire_at;
        if (account_expire_at <= now) {
          delete users[username];
        }
      }
    }
  }
}

const transfer = (sender, amount, receiver_username, remark) => {
  if (sender.balance < amount) {
    return false;
  }

  remark = typeof remark === 'undefined' ? remark : '';
  // amount =  parseFloat(amount);
  receiver_username = receiver_username.toLowerCase().trim();
  const { transactions } = sender;
  const receiver = user.findUser(receiver_username);
  if (receiver) {
    sender.balance -= amount;
    receiver.balance += amount;
    // Update sender transaction
    transactions.push({
      amount: -amount,
      username: receiver_username,
      remark,
      balance: sender.balance
    });
    // Update receiver transaction
    const receiver_transactions = receiver.transactions
    receiver_transactions.push({
      amount: amount,
      username: sender.username,
      remark,
      balance: receiver.balance
    });
    users[sender.username] = sender;
    users[receiver_username] = receiver;
  } else {
    sender.balance -= amount;
    transactions.push({
      amount: -amount,
      username: receiver_username,
      remark,
      balance: sender.balance
    });
    users[sender.username] = sender;
  }

  return users[sender.username];
}

module.exports = {
  user,
  transfer
}