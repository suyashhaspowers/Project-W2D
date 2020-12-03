import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import Home from './components/Home/Home';
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'

import './styles/styles.scss';

render((
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup}/>
    </div>
  </Router>
), document.getElementById('app'));
