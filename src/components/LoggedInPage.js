import React, {useContext } from "react";
import { UserContext } from "./MainAuth";
import RecentOrders from "./RecentOrders";
import Profile from "./Profile";

const LoggedInPage = () => {
  const {user, setUser} = useContext(UserContext);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  }

  return (
    <div>
      <h1>Welcome {user.username}</h1>
      <Button onClick={handleLogout}>Logout</Button>
      <RecentOrders />
      <Profile />
    </div>
  )
}

export default LoggedInPage;