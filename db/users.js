const client = require("./client");
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const hashPassword = async string => {
  const hash = await bcrypt.hash(string, SALT_COUNT);
  return hash;
};

async function createUser({ username, email, password }) {
  const hashedPassword = await hashPassword(password);

  try {
    const { rows: [user] } = await client.query(`
        INSERT INTO users(username, email, password)
        VALUES ($1, $2, $3)
        RETURNING *;
      `, [username, email, hashedPassword]);

    delete user.password;

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;

    if (await bcrypt.compare(password, hashedPassword)) {
      delete user.password;
      return user;
    }
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const { rows: [user] } = await client.query(`
    SELECT * 
    FROM users
    WHERE username=$1;
    `, [username]);

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById({id, username, isAdmin}) {
  try {
    const { rows: [user] } = await client.query(`
    SELECT id, username, "isAdmin"
    FROM users
    WHERE id=$1;
    `, [id, username, isAdmin]);

    return user;
  } catch (error) {
    throw error;
  }
}

async function deleteUser(id) {
  try {
    const { rows: [user] } = await client.query(`
    DELETE FROM users
    WHERE id = $1
    `, [id]);

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  createUser,
  getUserByUsername,
  getUser,
  getUserById,
  deleteUser
}