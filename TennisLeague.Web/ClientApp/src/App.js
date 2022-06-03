import { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchPlayers } from './components/FetchPlayers';
import Facilities from './components/facility/Facilities';
import Admin from './components/admin/Admin';
import Rules from './components/rules/rules';
import About from './components/about/about';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/fetch-players' component={FetchPlayers} />
        <Route path='/courts' component={Facilities} />
        <Route path='/admin' component={Admin} />
        <Route path='/rules' component={Rules} />
        <Route path='/about' component={About} />
      </Layout>
    );
  }
}
