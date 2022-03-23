import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchPlayers } from './components/FetchPlayers';
import Facilities from './components/facility/Facilities';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/fetch-players' component={FetchPlayers} />
        <Route path='/courts' component={Facilities} />
      </Layout>
    );
  }
}
