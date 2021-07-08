import React, { useEffect, useState } from "react";
import LoggedInPage from "./LoggedInPage.js";
import Login from "./Login.js";

import { getToken } from "../api/token.js";

export const UserContext = React.createContext();

const MainAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    const headers = token ? {Authorization: `Bearer ${token}`,} : {};

    fetch("/api/users/me", {
      headers,
    })
    .then((d) => d.json())
    .then((u) => {
      if (u.user) setUser(u.user);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {user ? <LoggedInPage /> : <Login />}
    </UserContext.Provider>
  )
}

export default MainAuth;