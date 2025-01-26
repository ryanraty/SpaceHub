// Helper function to get data from localStorage
function getStorageData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// Helper function to save data to localStorage
function saveStorageData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Show the login page
function showLogin() {
  document.getElementById('loginPage').style.display = 'block';
  document.getElementById('signUpPage').style.display = 'none';
  document.getElementById('homePage').style.display = 'none';
}

// Show the sign-up page
function showSignUp() {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('signUpPage').style.display = 'block';
  document.getElementById('homePage').style.display = 'none';
}

// Show the home page
function showHomePage() {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('signUpPage').style.display = 'none';
  document.getElementById('homePage').style.display = 'block';
  const currentUser = getStorageData('currentUser');
  document.getElementById('userDisplayName').textContent = currentUser.username;
  updateFriendsList();
}

// Login function
function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  const users = getStorageData('users');
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    showHomePage();
  } else {
    alert('Invalid credentials');
  }
}

// Sign up function
function signUp() {
  const username = document.getElementById('signupUsername').value;
  const password = document.getElementById('signupPassword').value;

  const users = getStorageData('users');
  if (users.find(u => u.username === username)) {
    alert('Username already exists');
    return;
  }

  const newUser = { username, password, friends: [], messages: {} };
  users.push(newUser);
  saveStorageData('users', users);

  alert('Account created successfully');
  showLogin();
}

// Logout function
function logout() {
  localStorage.removeItem('currentUser');
  showLogin();
}

// Update friends list UI
function updateFriendsList() {
  const currentUser = getStorageData('currentUser');
  const friendsList = document.getElementById('friendsList');
  friendsList.innerHTML = '';

  currentUser.friends.forEach(friend => {
    const li = document.createElement('li');
    li.textContent = friend;
    friendsList.appendChild(li);
  });
}

// Add friend function
function addFriend() {
  const friendUsername = document.getElementById('addFriendUsername').value;
  const currentUser = getStorageData('currentUser');
  const users = getStorageData('users');
  
  const friend = users.find(u => u.username === friendUsername);
  if (!friend) {
    alert('User not found');
    return;
  }

  // Check if the friend is already in the list
  if (currentUser.friends.includes(friendUsername)) {
    alert('You are already friends with this user');
    return;
  }

  // Send a friend request (you can implement approval logic later)
  currentUser.friends.push(friendUsername);
  saveStorageData('users', users);
  saveStorageData('currentUser', currentUser);

  updateFriendsList();
}

// Send message function
function sendMessage() {
  const message = document.getElementById('messageInput').value;
  const currentUser = getStorageData('currentUser');
  const messages = currentUser.messages;

  // You can send the message to the friends by storing them in the messages object
  Object.keys(messages).forEach(friend => {
    messages[friend].push(message);
  });

  saveStorageData('currentUser', currentUser);
  updateMessages();
}

// Update messages UI
function updateMessages() {
  const currentUser = getStorageData('currentUser');
  const messageList = document.getElementById('messageList');
  messageList.innerHTML = '';

  Object.keys(currentUser.messages).forEach(friend => {
    currentUser.messages[friend].forEach(msg => {
      const li = document.createElement('li');
      li.textContent = `${friend}: ${msg}`;
      messageList.appendChild(li);
    });
  });
}

// Initialize with login page
showLogin();

