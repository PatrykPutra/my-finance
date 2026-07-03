export const STORAGE_KEYS = {
  USERS: 'my-finance-users',
};

const getStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getUsers = () => getStorage(STORAGE_KEYS.USERS, []);
export const setUsers = (users) => setStorage(STORAGE_KEYS.USERS, users);
export const getUserById = (id) => getUsers().find(u => u.id === id);
export const getUserByName = (username) => getUsers().find(u => u.name === username);

export const getUserTransactions = (userId) => 
  getUsers()
    .filter(user => user.id === userId)
    .flatMap(user => user.transactions || []);

export const addUserTransaction = (newTransaction) => {
  const users = getUsers();
  const date = new Date();
  const dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
  const transaction = {...newTransaction, id: generateGUID(), date: dateString}
  const user = users.find(u => u.id === transaction.userId);
  if (!user) throw new Error('User not found');
  
  user.transactions = (user.transactions || []).concat(transaction);
  setUsers(users);
  return transaction;
};

export const updateUserTransaction = (transaction) => {
  const users = getUsers();
  const user = users.find(u => u.id === transaction.userId);
  if (!user) throw new Error('User not found');
  
  const existingTransaction = user.transactions.find(t => t.id === transaction.id);
  if (existingTransaction) {
    const index = user.transactions.findIndex(t => t.id === transaction.id);
    user.transactions[index] = { ...existingTransaction, ...transaction };
  }
  setUsers(users);
  return transaction;
};

export const deleteUserTransaction = (userId,transactionId) => {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) throw new Error('User not found');
  
  const updatedUsers = users.map(user => {
    if (user.id === userId) {
      return { ...user, transactions: user.transactions.filter(t => t.id !== transactionId) };
    }
    return user;
  });
  
  setUsers(updatedUsers);
};

export const addUser = (newUserRequest) => {
  const users = getUsers();
  const userId = generateGUID();
  const user = {...newUserRequest, id: userId, token: userId, transactions: []}
  users.push(user);
  setUsers(users);
  return user;
};

export const modifyUser = (user) => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === user.id);
  if (index !== -1) {
    const oldUser = users[index];
    const newUser = {...oldUser, password: user.password};
    users[index] = newUser;
    setUsers(users);
  }
  return user;
};

export const removeUser = (userId) => {
  const users = getUsers();
  const updatedUsers = users.filter(u => u.id !== userId);
  setUsers(updatedUsers);
};

function generateGUID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
console.log(generateGUID());
