import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

const UserEditView = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    fetch(`https://fakestoreapi.com/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setName(data.name);
        setEmail(data.email);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, name, email };
    setUser(updatedUser);
    alert('User updated');
    navigate('/users');
  };

  return (
    <Container>
      <h1>Edit User</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update User
        </Button>
      </Form>
    </Container>
  );
};

export default UserEditView;
