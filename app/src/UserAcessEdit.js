import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class UserAcessEdit extends Component {

  emptyItem = {
    user_login: '',
    machine_id: ''
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
      this.setState({item: this.emptyItem});
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    let response;
    try{
        response = await fetch('/machine-monitor-api/v1/users/acess/request', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
    }
    catch (ex) {
       console.log(ex);
    }
    if (!response.ok) {
       console.log(response);
       alert("ERROR: Invalid acess data!");
    }
    else {
        this.props.history.push('/');
    }
  }

  render() {
    const {item} = this.state;
    const title = <h2>Request User Acess to Machine</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="user_login">User Login</Label>
            <Input type="text" name="user_login" id="user_login" value={item.user_login || ''}
                   onChange={this.handleChange} autoComplete="user_login"
                   style={{width: "370px"}} />
          </FormGroup>
          <FormGroup>
                      <Label for="machine_id">Machine Id</Label>
                      <Input type="text" name="machine_id" id="machine_id" value={item.machine_id || ''}
                             onChange={this.handleChange} autoComplete="machine_id"
                             style={{width: "370px"}} />
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(UserAcessEdit);