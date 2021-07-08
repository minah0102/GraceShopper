import React, { useContext } from "react";
import { UserContext } from "..";
import RecentOrders from "./RecentOrders";
import Profile from "./Profile";
import { Button } from "react-bootstrap";

const LoggedInPage = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>Welcome {user.username}</h1>
      <RecentOrders />
      <Profile />
    </div>
  );
};

export default LoggedInPage;
