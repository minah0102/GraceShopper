const client = require("./client");
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const hashPassword = async string => {
	const hash = await bcrypt.hash(string, SALT_COUNT);
	return hash;
};

async function createUser({ username, email, password }) {
  //make sure to hash the password before storing it to the database

  const hashedPassword = await hashPassword(password);

  //should I RETURN id username || * ??
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



module.exports = {
  client,
  createUser
}