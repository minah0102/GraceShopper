import axios from "axios";
import { setToken, setUsername, getTokenConfig, setEmail } from "./token";

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

export async function getAllUsers() {
  const { config } = getTokenConfig();
  try {
    const {data: users} = await axios.get(`${URL}/users`, config);

    return users;
  } catch (error) {
    console.log("Error in api/getAllUsers");
    throw error;
  }
}

// export const getAllUsers = async (id, username, email) => {
//   try {
//     const response = await fetch(`${URL}/users`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           id,
//           username,
//           email
//         }),
//       });
//       const users = await response.json();
//       return users;
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const getAllUsers = async (user) => {
//   const { token } = getTokenConfig();
//   try {
//     const { data: allUsers } = await axios.get(`${URL}/users`,
//       user,
//       {
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       }
//     )
//     return allUsers;
//   } catch (error) {
//     console.error(error);
//   }
// }

// export async function getAllUsers() {
//   try {
//     const data = await axios.get(`${URL}/users`)
//       .then(response => response.data)
//       .then(data => this.setState({ data }));

//     return data;
//   } catch (error) {
//     console.log("Error in api/getAllUsers");
//     throw error;
//   }
// }

// export const getAllUsers = (id, username, email) => {
//   return fetch("api/users", {
//     method: "GET",
//     body: JSON.stringify({
//       id,
//       username,
//       email,
//     })
//   })
//   .then((d) => d.json())
//   .then((r) => this.setState({r}));
// }

// export const getAllUsers = async (id, username, email) => {
//   const response = await fetch("/api/users", {
//     method: "GET",
//     body: JSON.stringify({
//       id, username, email,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     }
//   })

//   .then((d) => d.json())
//   .then((r) => {
//     const {user, email, error} = r;
//     if (user && email) {
//       setUsername(user.username);
//       setEmail(user.email);
//     }
//     return { user, error };
//   });

// //   const r = await response.json();
// //   return r;
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