import React, { Component } from 'react';
import { Form, Item, Input, Label } from 'native-base';
export default class PaymentForm extends Component {
  render() {
    return (
      <Form>
        <Item floatingLabel>
          <Label>Amount</Label>
          <Input />
        </Item>
        <Item floatingLabel last>
          <Label>Date</Label>
          <Input />
        </Item>
        <Item floatingLabel last>
          <Label>Comment</Label>
          <Input />
        </Item>
      </Form>
    );
  }
}