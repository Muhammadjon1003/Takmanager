export const saveUserToLocalStorage = (user) => {
  const users = getUsersFromLocalStorage();
  
  // Check if email already exists
  if (users.some(existingUser => existingUser.email === user.email)) {
    throw new Error('Email already exists');
  }

  // Add new user
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};

export const getUsersFromLocalStorage = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

export const validateLogin = (email, password) => {
  const users = getUsersFromLocalStorage();
  const user = users.find(user => user.email === email && user.password === password);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }

  return user;
};

export const setCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const logoutUser = () => {
  localStorage.removeItem('currentUser');
}; 