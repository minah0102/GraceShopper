import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import { UserContext } from "..";

const RecentOrders = () => {
  const { orderHistory } = useContext(UserContext);

  return (
    <div>
      <h2>Recent Orders</h2>
      <Table>
        <thead>
          <tr>
            <th>Date Purchased</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>

          <tbody>
            {orderHistory.map(pastedOrder =>
              <tr key={pastedOrder.id}>
                <td>{pastedOrder.purchasedDate}</td>
                <td>{pastedOrder.name}</td>
                <td>{pastedOrder.quantity}</td>
                <td>{pastedOrder.price}</td>
              </tr>
            )}
          </tbody>
        </thead>
      </Table>
    </div>
  )
}

export default RecentOrders;