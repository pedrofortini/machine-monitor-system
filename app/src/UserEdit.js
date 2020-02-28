import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class UserEdit extends Component {

  emptyItem = {
    login: ' ',
    name: '',
    user_is_admin: false
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
    if (this.props.match.params.login !== 'new') {
      const user = await (await fetch(`/machine-monitor-api/v1/users/` + this.props.match.params.login)).json();
      this.setState({item: user});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const type = target.type;
    const checked = target.checked;
    const name = target.name;
    let item = {...this.state.item};

    if (type === 'checkbox' && name === 'user_is_admin') {
        item[name] = !item[name];
    } else {
      item[name] = value;
    }
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
    console.log(this.state);
    await fetch('/machine-monitor-api/v1/users', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    }).catch(err => {
      alert(err.response.data)
      console.log(err.response.data);
    });
    this.props.history.push('/users');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.login !== ' ' ? 'Edit User' : 'Create User'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="login">Login</Label>
            <Input type="text" name="login" id="login" value={item.login || ''}
                   onChange={this.handleChange} autoComplete="login"
                   style={{width: "370px"}} />
          </FormGroup>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" value={item.name || ''}
                   onChange={this.handleChange} autoComplete="name"
                   style={{width: "670px"}} />
          </FormGroup>
          <FormGroup>
            <Input type="checkbox" name="user_is_admin" id="user_is_admin"
                             checked={item.user_is_admin} onChange={this.handleChange} />
            <Label>
                   User is Admin
             </Label>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/users">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(UserEdit);