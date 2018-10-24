import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { savePayment, formChanged } from "../actions";
import { Form, Item, Input, Label, Button, DatePicker, Text } from "native-base";

// I miss TypeScript's enums, moreover I miss C-esque langs
const formMapping = {
  AMOUNT: "amount",
  DATE: "date",
  COMMENT: "comment"
};

class PaymentForm extends Component {
  onFormChange(type, value) {
    console.log(value, type);
    switch (type) {
      case formMapping.AMOUNT: {
        this.props.formChanged({
          amount: value,
          date: this.props.date,
          comment: this.props.comment
        });
        break;
      }
      case formMapping.DATE: {
        this.props.formChanged({
          amount: this.props.amount,
          date: value,
          comment: this.props.comment
        });
        break;
      }
      case formMapping.COMMENT: {
        this.props.formChanged({
          amount: this.props.amount,
          date: this.props.date,
          comment: value
        });
        break;
      }
    }
  }
  onClickSave() {
    this.props.savePayment({
      amount: this.props.amount,
      date: new Date(),
      comment: this.props.comment
    });
    
  }
  render() {
    return (
      <Form>
        <Item floatingLabel>
          <Label>Amount</Label>
          <Input
            keyboardType="phone-pad"
            onChangeText={this.onFormChange.bind(this, formMapping.AMOUNT)}
            value={`${this.props.amount}`}
          />
        </Item>
        <Item floatingLabel>
          <Label>Comment</Label>
          <Input
            onChangeText={this.onFormChange.bind(this, formMapping.COMMENT)}
            value={this.props.comment}
          />
        </Item>
        <DatePicker
          defaultDate={new Date()}
          locale={"en"}
          timeZoneOffsetInMinutes={undefined}
          modalTransparent={false}
          animationType={"fade"}
          androidMode={"default"}
          placeHolderText="Select date"
          textStyle={{ color: "green" }}
          placeHolderTextStyle={{ color: "#d3d3d3" }}
          onDateChange={this.onFormChange.bind(this, formMapping.DATE)}
          />
        <Button primary onPress={() => {this.onClickSave()}}>
          <Text> Save </Text>
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.payments);
  console.log("dd");
  console.log(state.paymentForm);
  return {
    amount: state.paymentForm.amount,
    date: state.paymentForm.date,
    comment: state.paymentForm.comment
  };
};

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
      savePayment: savePayment,
      formChanged: formChanged
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentForm);
