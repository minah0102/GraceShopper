const express = require('express');
const usersRouter = express.Router();

const {
  createUser,
  getUserByUsername,
  getUser,
  getUserById,
  deleteUser
} = require("../db");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// GET /users/me
usersRouter.get("/me", async (req, res, next) => {
  const user = req.user;
  try {
    if (!user) throw "User is not logged in!";
    const { id, username } = user;

    res.send({
      id, username
    });
  } catch (error) {
    res.status(404);
    next(error);
  }
});

//POST /users/login

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next(new Error("Missing login credentials!"));
  }
  try {
    const user = await getUserByUsername(username);

    if (!user) {
      next(new Error(`user with username ${username} not found!`));
    } else {
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (passwordsMatch) {
        delete user.password;
        const token = jwt.sign(user, JWT_SECRET);
        res.send({
          user,
          token,
          message: `logged in as ${username} successfully!`,
        });
      } else {
        res.send({
          error: "invalid credentials!",
          message: "username and/or password is incorrect!",
        });
      }
    }
  } catch (error) {
    console.error("error getting user by username");
    throw error;
  }
});

//POST /users/register

usersRouter.post('/register', async (req, res, next) => {
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			const error = new Error('Missing credentials');
			return res.status(400).send({ data: error.message });
		}

		const user = await getUserByUsername(username);

		if (user) {
			const error = new Error('User already exists');
			return res.status(400).send({ data: error.message });
		}

		if (password.length < 8) {
			const error = new Error('Password must be at least 8 characters');
			return res.status(400).send({ data: error.message });
		}
		const newUser = await createUser({ username, password });

		res.send({ user: newUser });
	} catch ({ name, message }) {
		next({ name, message });
	}
});

//DELETE /users/:userId
usersRouter.delete('/:userId', async (req, res, next) => { 
  try {
    if (!req.user) {
      return "User is not logged in. Please login to proceed."
    }

    const userId = req.user.id;
    if (userId) {
      const deleteCurrentUser = await deleteUser(id);
      res.send(deleteCurrentUser);
    } else {
      return "Cannot delete user. Invalid user."
    }
  } catch (error) {
    console.error("error deleting user");
    next(error);
  }
})

module.exports = {usersRouter};