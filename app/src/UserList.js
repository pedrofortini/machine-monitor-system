import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class UserList extends Component {

  constructor(props) {
    super(props);
    this.state = {users: [], isLoading: true};
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('/machine-monitor-api/v1/users')
      .then(response => response.json())
      .then(data => this.setState({users: data, isLoading: false}));
  }

  render() {
    const {users, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const userList = users.map(user => {
      return <tr key={user.login}>
        <td style={{whiteSpace: 'nowrap'}}>{user.login}</td>
        <td style={{whiteSpace: 'nowrap'}}>{user.name}</td>
        <td>{user.user_is_admin ? "Yes" : "No" }</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/users/" + user.login}>Edit</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/users/new">Create User</Button>
          </div>
          <h3>User List</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Login</th>
              <th>Name</th>
              <th width="20%">User is Admin</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {userList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default UserList;