import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { savePayment } from "../actions";
import { Form, Item, Input, Label, Button, Text } from "native-base";
class PaymentForm extends Component {
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
        <Button
          primary
          onPress={() =>
            this.props.savePayment({
              id: 100,
              amount: 100,
              date: new Date(),
              comment: "Test"
            })
          }
        >
          <Text> Save </Text>
        </Button>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  // another way of doing it
  // return {
  //   savePayment: (payment) => {
  //     dispatch(savePayment(payment));
  //   }
  // }
  return bindActionCreators(
    {
      // The KEY is what we can call in THIS container as a function
      // The VALUE is an actual action, imported at the top, that
      // flows throw all of the redcuers via funnel function 'dispatch'
      savePayment: savePayment
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(PaymentForm);
