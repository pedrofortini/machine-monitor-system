import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';

class MachineEdit extends Component {

  emptyItem = {
    id: '',
    name: '',
    ip_address: '',
    machine_is_up: false,
    admin_user: '',
    last_downtime: '',
    users_acess: [],
    machine_events_log: []
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const machine = await (await fetch(`/machine-monitor-api/v1/machines/` + this.props.match.params.id)).json();
      if(machine.users_acess === null){
        machine.users_acess = []
      }
      if(machine.machine_events_log === null){
              machine.machine_events_log = []
      }
      this.setState({item: machine});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const type = target.type;
    const name = target.name;
    let item = {...this.state.item};

    if (type === 'checkbox' && name === 'machine_is_up') {
        item[name] = !item[name];
    } else {
      item[name] = value;
    }
    this.setState({item});
  }

  async handleSubmit(event) {
      event.preventDefault();
      const {item} = this.state;

      let response;
      try{
          response = await fetch('/machine-monitor-api/v1/machines', {
              method: 'PUT',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  id: item.id,
                  name: item.name,
                  ip_address: item.ip_address,
                  machine_is_up: item.machine_is_up,
                  admin_user: item.admin_user,
              }),
          });
      }
      catch (ex) {
         console.log(ex);
      }
      if (!response.ok) {
         console.log(response);
         alert("ERROR: Invalid Machine data Provided!");
      }
      else {
          this.props.history.push('/machines');
      }
    }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id !== '' ? 'Edit Machine' : 'Create Machine'}</h2>;

    const machineUserList = item.users_acess.map(user => {
          return <tr key={user}>
            <td style={{whiteSpace: 'nowrap'}}>{user}</td>
          </tr>
        });

     const machineEventList = item.machine_events_log.map(event => {
              return <tr key={event.type+event.time_stamp}>
                <td style={{whiteSpace: 'nowrap'}}>{event.type}</td>
                <td style={{whiteSpace: 'nowrap'}}>{event.time_stamp}</td>
              </tr>
            });

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
             <Label for="id">Machine Id</Label>
                 <Input type="text" name="id" id="id" value={item.id || ''}
                     readOnly autoComplete="id"
                     style={{width: "370px"}} />
          </FormGroup>
          <FormGroup>
            <Label for="name">Name</Label>
               <Input type="text" name="name" id="name" value={item.name || ''}
                   onChange={this.handleChange} autoComplete="name"
                   style={{width: "670px"}} />
          </FormGroup>
          <FormGroup>
            <Label for="ip_address">Ip Address</Label>
            <Input type="text" name="ip_address" id="ip_address" value={item.ip_address || ''}
                   onChange={this.handleChange} autoComplete="ip_address"
                   style={{width: "670px"}} />
          </FormGroup>
          <FormGroup>
            <Label for="admin_user">Admin User</Label>
            <Input type="text" name="admin_user" id="admin_user" value={item.admin_user || ''}
                   onChange={this.handleChange} autoComplete="admin_user"
                   style={{width: "370px"}} />
          </FormGroup>
          <FormGroup>
            <Input type="checkbox" name="machine_is_up" id="machine_is_up"
                             checked={item.machine_is_up} onChange={this.handleChange} />
            <Label>
                   Machine is Running
             </Label>
          </FormGroup>
          <FormGroup>
            <h3>User Acess List</h3>
               <Table className="mt-4">
                  <thead>
                    <tr>
                      <th width="20%">Login</th>
                     </tr>
                   </thead>
                   <tbody>
                    {machineUserList}
                   </tbody>
               </Table>
          </FormGroup>
          <FormGroup>
            <h3>Machine Event Log</h3>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th width="20%">Type</th>
                            <th width="20%">Timestamp</th>
                        </tr>
                     </thead>
                     <tbody>
                        {machineEventList}
                     </tbody>
                </Table>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/machines">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(MachineEdit);