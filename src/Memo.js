import React, { Component } from 'react';
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

export default class Memo extends Component {
  render() {
    return (
      <ListGroupItem key={this.props.item.id}>
        <ListGroupItemHeading>{this.props.item.title}</ListGroupItemHeading>
        <ListGroupItemText>{this.props.item.content}</ListGroupItemText>
        <button onClick={() => this.props.removeItem(this.props.item.id)}>Remove Item</button>
      </ListGroupItem>
    );
  }
}