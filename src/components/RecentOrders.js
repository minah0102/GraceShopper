import React, { useContext } from "react";
import { Container, Table, Row, Col } from "react-bootstrap";
import { UserContext } from "..";

const RecentOrders = () => {
  const { orderHistory } = useContext(UserContext);


  return (
    <div>
      <h2>Recent Orders</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date Purchased</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        
            {orderHistory.map(pastedOrder =>
              <tbody>
                <tr key={pastedOrder.id}>
                  <td>{pastedOrder.id}</td>
                  <td>{pastedOrder.purchasedDate}</td>
                  
                  {pastedOrder.products.map(({ name, quantity, price }) =>
                    <>
                      <td>{name}</td>
                      <td>{quantity}</td>
                      <td>{price}</td>
                    </>
                  )}

                </tr>
              </tbody>
            )}
        

      </Table>

    </div>
  )
}

export default RecentOrders;