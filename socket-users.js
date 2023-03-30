const moment = require("moment")

const {
  getUserByEmail
} = require('./database/users');

const users = []

const addUser = ({ id, userid, email }) => {
  let existingUser;

  getUserByEmail(email)
  .then(result => {
    if (result) {
      existingUser = result
    } else {
      console.log("add user erorr!")
    }
  })
  .catch(err => {
    console.log(err);
  });

  if(!userid || !email ) return { error: 'Username is required.' }

  if(existingUser && (typeof existingUser !== 'undefined')) {
    existingUser.state = 'online'
    existingUser.id = id;
    return { user: existingUser }
  }

  const user = { id, userid, email, state: 'online' }

  users.push(user)

  return { user }
}

const removeUser = (email) => {
  let existingUser ;
  getUserByEmail(email)
  .then(result => {
    if (result) {
      existingUser = result
    } else {
      console.log("add user erorr!")
    }
  })
  .catch(err => {
    console.log(err);
  });

  if(existingUser && (typeof existingUser !== 'undefined')) {
    const utcMoment = moment.utc()

    existingUser.state = 'offline'
    existingUser.last_active_time = utcMoment.valueOf()
  }

  return existingUser
}

const changeUserState = ({email, state}) => {
  let existingUser ;
  getUserByEmail(email)
  .then(result => {
    if (result) {
      existingUser = result
    } else {
      console.log("add user erorr!")
    }
  })
  .catch(err => {
    console.log(err);
  });

  if(existingUser && (typeof existingUser !== 'undefined')) {
    existingUser.state = state
  }

  return existingUser
}


module.exports = { addUser, removeUser, changeUserState };