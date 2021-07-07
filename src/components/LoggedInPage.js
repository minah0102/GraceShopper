import React from "react";
import RecentOrders from "./RecentOrders";

const LoggedInPage = () => {
  return (
    <div>
      <RecentOrders />
      <Profile />
    </div>
  )
}

export default LoggedInPage;