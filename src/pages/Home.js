import React from 'react';
import Products from './Products';
import User from './User';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const Home = () => {
  return (
    <div>
       <Nav defaultActiveKey="/home" as="ul">
      <Nav.Item as="li">
        <Nav.Link to="/product">Product</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link to="/user">User</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="link-2">Link</Nav.Link>
      </Nav.Item>
    </Nav>

      
    </div>
  );
}

export default Home;
