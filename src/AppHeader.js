import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class AppHeader extends Component {
  render() {
    return (
      <div>
        {
          this.props.user 
          ? <header>Memo {this.props.user.displayName} <Button color="primary" onClick={this.props.logout}>Logout</Button></header>
          : <header>Memo <Button onClick={this.props.login}>Login</Button></header>
        }
      </div>
    );
  }
}