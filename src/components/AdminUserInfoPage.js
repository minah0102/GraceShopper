import React, { useContext } from "react";
import { UserContext } from "..";
import { Table } from "react-bootstrap";


const AdminUserInfoPage = () => {
  const { users } = useContext(UserContext);

  console.log("ALL USERS", users);
//  const { id, username, email } = users;

  return (
    <>
      <h3>User Information</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {
            users.map(user =>
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            )
          }
          {/* {
            this.user.data.map(function (user) {
              return <tr>
                <td key={user.id}>{user.id}</td>
                <td key={user.username}>{user.username}</td>
                <td key={user.email}>{user.email}</td>
              </tr>


            })
          } */}
        </tbody>

      </Table>
    </>
  )
}

export default AdminUserInfoPage;