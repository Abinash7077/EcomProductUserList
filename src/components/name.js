import React,{useState,useEffect} from "react";
import { Container,Table,Button } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";

const UserListView = () => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      fetch('https://fakestoreapi.com/users')
        .then((response) => response.json())
        .then((data) => setUsers(data));
    }, []);
    console.log(users)
  
    const getUserLocations = () => {
      const locations = {};
  
      users.forEach((user) => {
        if (user.address && user.address.city) {
          const city = user.address.city;
  
          if (locations[city]) {
            locations[city]++;
          } else {
            locations[city] = 1;
          }
        }
      });
  
      return locations;
    };
  
    const getUserCategories = () => {
      const categories = {};
  
      users.forEach((user) => {
        if (user.category) {
          const category = user.category;
  
          if (categories[category]) {
            categories[category]++;
          } else {
            categories[category] = 1;
          }
        }
      });
  
      return categories;
    };
  
    const userLocations = getUserLocations();
    const userCategories = getUserCategories();
  
  
    const locationChartData = {
      labels: Object.keys(userLocations),
      datasets: [
        {
          data: Object.values(userLocations),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A', '#FF9E40'],
        },
      ],
    };
    console.log(locationChartData)
    console.log(locationChartData.labels)
    console.log(locationChartData.datasets)
   

    console.log(locationChartData.datasets)


  
    const categoryChartData = {
      labels: Object.keys(userCategories),
      datasets: [
        {
          data: Object.values(userCategories),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A', '#FF9E40'],
        },
      ],
    };
  
    return (
    <>
      <Container>
        <h1>User List</h1>
  
       {/*  <h2>User Locations</h2>
        <Pie data={locationChartData} />
  
        <h2>User Categories</h2>
        <Pie data={categoryChartData} /> */}
  
        <Table striped bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name.firstname} {user.name.lastname}</td>
                <td>{user.email}</td>
                <td>
                  <Link to={`/users/${user.id}`} className="btn btn-primary me-2">View</Link>
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container></>
    );
  };
  