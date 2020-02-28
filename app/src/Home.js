import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar/>
        <Container fluid>
            <Button color="link"><Link to="/users">Manage Users</Link></Button>
        </Container>
        <Container fluid>
          <Button color="link"><Link to="/machines">Manage Machines</Link></Button>
        </Container>
        <Container fluid>
            <Button color="link"><Link to="/users-acess">Manage Users Acess to Machines</Link></Button>
        </Container>
      </div>
    );
  }
}

export default Home;