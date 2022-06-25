import { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import Facilities from './components/facility/Facilities';
import Admin from './components/admin/Admin';
import Rules from './components/rules/rules';
import About from './components/about/about';
import LeaguesPage from './components/leagues/Leagues';

import './styles/app.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/courts' component={Facilities} />
        <Route path='/admin' component={Admin} />
        <Route path='/rules' component={Rules} />
        <Route path='/about' component={About} />
        <Route path='/leagues' component={LeaguesPage} />
      </Layout>
    );
  }
}
