import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class MachineList extends Component {

  constructor(props) {
    super(props);
    this.state = {machines: [], isLoading: true};
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('/machine-monitor-api/v1/machines')
      .then(response => response.json())
      .then(data => this.setState({machines: data, isLoading: false}));
  }

  render() {
    const {machines, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const machineList = machines.map(machine => {
      return <tr key={machine.id}>
        <td style={{whiteSpace: 'nowrap'}}>{machine.id}</td>
        <td style={{whiteSpace: 'nowrap'}}>{machine.name}</td>
        <td style={{whiteSpace: 'nowrap'}}>{machine.ip_address}</td>
        <td>{machine.machine_is_up ? "Running" : "Down" }</td>
        <td style={{whiteSpace: 'nowrap'}}>{machine.last_downtime}</td>
        <td style={{whiteSpace: 'nowrap'}}>{machine.admin_user}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/machines/" + machine.id}>Edit</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/machines/new">Create Machine</Button>
          </div>
          <h3>Machine List</h3>
          <Table className="mt-3">
            <thead>
            <tr>
              <th width="10%">Machine Id</th>
              <th width="20%">Name</th>
              <th width="20%">Ip Address</th>
              <th width="20%">Status</th>
              <th width="20%">Last Downtime</th>
              <th width="20%">Admin User</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {machineList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default MachineList;