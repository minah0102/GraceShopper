import axios from "axios";
//import { loginUser } from "./users";
import { setToken, setUsername } from "./token";

const URL = `http://localhost:3000/api`;

//for admins
export async function getUser(userId) {
  try {
    const { data } = await axios.get(`${URL}/users/${userId}`);

    return data;
  } catch (error) {
    console.log("Error in api/getUser");
    throw error;
  }
}

// export async function registerUser() {
//   try {
//     const { data } = await axios.post(`${URL}/users/register`);

//     return data;
//   } catch (error) {
//     console.log("Error in api/registerUser");
//     throw error;
//   }
// }

// export async function loginUser() {

// }

export const loginUser = (username, password) => {
  return fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((d) => d.json())
  .then((r) => {
    const { user, token, error } = r;
    if (token && user) {
      setToken(token);
      setUsername(user.username);
    }
    return { user, error };
  });
};

export const registerUser = (username, email, password) => {
  return fetch("/api/users/register", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((d) => d.json())
  .then((r) => {
    const { user, token, error } = r;
    if (token && user) {
      setToken(token);
      setUsername(user.username);
    }
    return { user, error };
  });
};