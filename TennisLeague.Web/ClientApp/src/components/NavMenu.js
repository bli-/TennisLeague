import { Component } from 'react';
import { Collapse, Container, NavItem, Navbar, NavbarBrand, NavbarToggler, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-lg navbar-toggleable-sm ng-white mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">TENNIS<br/>LEAGUE</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-lg-flex ps-lg-5" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-lg-grow-1 justify-content-lg-between">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/leagues">Leagues</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Schedule</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/courts">Courts</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/rules">Rules</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/about">About</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/admin">Admin</NavLink>
                </NavItem>
              </ul>
              <div className="ps-lg-5 ">
                <a href="/">Sign In</a> / <a href="/">Register</a>
              </div>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
