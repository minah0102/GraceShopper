import React from "react";
import { Figure, Form } from "react-bootstrap";

const Profile = () => {
  return (
    <div>
      <Figure>
        <Figure.Image
          width={171}
          height={180}
          alt="171x180"
          src={`/images/${imageName}`}
        />
      </Figure>
      
      <h1>
        username
        password
        email
      </h1>
    </div>
  )
}

export default Profile;