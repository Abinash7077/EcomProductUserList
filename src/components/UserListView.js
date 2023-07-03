import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const UserListView = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(4);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`https://fakestoreapi.com/users/${id}`, {
        method: 'DELETE',
      });
      setUsers(users.filter((user) => user.id !== id));
      alert('User deleted');
    } catch (error) {
      console.error('Error deleting User:', error);
    }
  };

  const fetchUsers = () => {
    fetch('https://fakestoreapi.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    return (
      <Pagination.Item
        key={pageNumber}
        active={pageNumber === currentPage}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </Pagination.Item>
    );
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  // Generate user location data for the pie chart
  const userLocationData = users.reduce((acc, user) => {
    const location = user.address.city;
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.entries(userLocationData).map(([location, count]) => ({
    name: location,
    value: count,
  }));

  const pieChartColors = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#FF8A80',
    '#FFD180',
  ];

  return (
    <Container fluid>
      <h1>User List</h1>

<div className="MainUserSection row">
      <Table className='col-6' striped bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name.firstname}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/users/${user.id}/edit`} className="btn btn-primary me-2">
                  Edit
                </Link>
                <Button variant="danger" onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      

      <Container className="chart_section col-6">
        <h2>Location wise User</h2>
        <PieChart className='pie' width={400} height={250}>
          <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={pieChartColors[index % pieChartColors.length]} />
            ))}
          </Pie>
          <Legend layout="vertical" align="right" verticalAlign="top" height={36} />
          <Tooltip />
        </PieChart>
      </Container>
      </div>
      <Container className="pagination_section">
        <Pagination>
          <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1} />
          {pageNumbers.map((pageNumber) => paginate(pageNumber))}
          <Pagination.Next
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(users.length / usersPerPage)}
          />
        </Pagination>
      </Container>
    </Container>
  );
};

export default UserListView;
