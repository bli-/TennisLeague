import React, { Component } from 'react';
import { Collapse, Container, DropdownMenu, DropdownToggle, DropdownItem, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap';
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
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">Tennis League</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <UncontrolledDropdown inNavbar nav>
                  <DropdownToggle caret nav>
                    Play
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <NavLink tag={Link} className="text-dark" to="/fetch-players">Players</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink tag={Link} className="text-dark" to="/courts">Our Courts</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Manage</NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
