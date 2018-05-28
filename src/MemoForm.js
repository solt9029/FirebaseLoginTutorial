import React, { Component } from 'react';
import { Button, Form, Input } from 'reactstrap';

export default class MemoForm extends Component {
  render() {
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <Input type="text" name="title" onChange={this.props.handleChange} value={this.props.title} placeholder="title" />
        <Input type="text" name="content" onChange={this.props.handleChange} value={this.props.content} placeholder="content" />
        <Button>Add Item</Button>
      </Form>
    );
  }
}