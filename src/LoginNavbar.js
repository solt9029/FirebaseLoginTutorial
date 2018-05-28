import React, { Component } from 'react';
import { Button, Navbar, NavbarBrand } from 'reactstrap';

export default class LoginNavbar extends Component {
  render() {
    return (
      <Navbar color="dark" style={{color: 'white'}}>
        <NavbarBrand>Memo</NavbarBrand>
        <Button onClick={this.props.login}>Login</Button>
      </Navbar>
    );
  }
}