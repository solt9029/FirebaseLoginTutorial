import React, { Component } from 'react';
import { Button, Form, Input, FormGroup, Label } from 'reactstrap';

export default class MemoForm extends Component {
  render() {
    return (
      <Form onSubmit={this.props.handleSubmit} style={{marginTop: '30px', marginBottom: '60px'}}>
        <FormGroup>
          <Label>title</Label>
          <Input type="text" name="title" onChange={this.props.handleChange} value={this.props.title} placeholder="title" />
        </FormGroup>
        <FormGroup>
          <Label>content</Label>
          <Input type="text" name="content" onChange={this.props.handleChange} value={this.props.content} placeholder="content" />
        </FormGroup>
        <Button>Add Item</Button>
      </Form>
    );
  }
}