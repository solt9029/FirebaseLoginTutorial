import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class AppHeader extends Component {
  renderDisplayName() {
    if (this.props.user) {
      return this.props.user.displayName;
    }
    return;
  }
  renderButton() {
    if (this.props.user) {
      return <Button color="primary" onClick={this.props.logout}>Logout</Button>;
    }
    return <Button onClick={this.props.login}>Login</Button>;
  }
  render() {
    return (
      <header>Memo {this.renderDisplayName()} {this.renderButton()}</header>
    );
  }
}