import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard'

import './styles/styles.scss';

render((
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route exact path="/dashboard" component={Dashboard}/>
    </div>
  </Router>
), document.getElementById('app'));
