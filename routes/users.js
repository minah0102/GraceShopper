const express = require('express');
const usersRouter = express.Router();

const {
  createUser,
  getUserByUsername,
  getUser,
  getUserById,
  deleteUser,
  updateUser
} = require("../db");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { requireUser, requireAdmin } = require('./utils');
const { JWT_SECRET } = process.env;

// GET /users/me
usersRouter.get("/me", requireUser, async (req, res, next) => {
  try {
    const { id, username } = user;

    res.send({
      id, username
    });
  } catch (error) {
    console.error("Error on user/me")
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
    console.error("Error on user/login");
    throw error;
  }
});

//POST /users/register
usersRouter.post('/register', async (req, res, next) => {
	try {
		const { username, password, email } = req.body;

		if (!username || !password || !email) {
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
		const newUser = await createUser({ username, password, email });
    const token = jwt.sign(newUser, JWT_SECRET);
		res.send({ user: newUser, token });
	} catch (error) {
		console.error("Error on register/user");
    next(error);
	}
});

//PATCH /users/:userId
usersRouter.patch('/:userId', requireUser, async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (userId) {
      const editUser = await updateUser(id);
      res.send(editUser);
    } else {
      return "Cannot edit user. Invalid user."
    }
  } catch (error) {
    console.error("Error editing/patching user");
    next(error);
  }
});

//DELETE /users/:userId
usersRouter.delete('/:userId', requireUser, requireAdmin, async (req, res, next) => { 
  try {
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
});

//admin => make other users admins

module.exports = usersRouter;