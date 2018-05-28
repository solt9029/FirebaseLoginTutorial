import React, { Component } from 'react';
import { Button, Navbar, NavbarBrand } from 'reactstrap';

export default class LoginNavbar extends Component {
  render() {
    return (
      <Navbar color="dark" style={{color: 'white'}}>
        <NavbarBrand>Memo for {this.props.user.displayName}</NavbarBrand>
        <Button onClick={this.props.logout}>Logout</Button>
      </Navbar>
    );
  }
}