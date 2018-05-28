import React, { Component } from 'react';
import { ListGroup } from 'reactstrap';
import Memo from './Memo';

export default class MemoList extends Component {
  render() {
    return (
      <ListGroup>
        {this.props.items.map((item) => {
          return <Memo item={item} removeItem={this.props.removeItem}/>
        })}
      </ListGroup>
    );
  }
}