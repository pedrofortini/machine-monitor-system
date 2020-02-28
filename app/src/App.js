import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserList from './UserList';
import UserEdit from './UserEdit';
import MachineList from './MachineList';
import MachineEdit from './MachineEdit';
import UserAcessEdit from './UserAcessEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/machines' exact={true} component={MachineList}/>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/users' exact={true} component={UserList}/>
          <Route path='/users/:login' component={UserEdit}/>
          <Route path='/machines/:id' component={MachineEdit}/>
          <Route path='/users-acess' exact={true} component={UserAcessEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
