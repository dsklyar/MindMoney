import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { savePayment, formChanged, formCleared } from "../actions";
import {
  Form,
  Item,
  Input,
  Label,
  Button,
  DatePicker,
  Text,
  Card,
  CardItem,
  Body
} from "native-base";
import { StyleSheet } from "react-native";
import { PHONE_DIMENSIONS } from "../constants";

// I miss TypeScript's enums, moreover I miss C-esque langs
const formMapping = {
  AMOUNT: "amount",
  DATE: "date",
  COMMENT: "comment"
};

class PaymentForm extends Component {
  onFormChange(type, value) {
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
      date: this.props.date,
      comment: this.props.comment
    });
    this.props.formCleared();
  }
  render() {
    return (
      <Card style={styles.card}>
        <Form>
          <Item floatingLabel>
            <Label>Amount</Label>
            <Input
              style={styles.input}
              keyboardType="phone-pad"
              onChangeText={this.onFormChange.bind(
                this,
                formMapping.AMOUNT
              )}
              value={`${this.props.amount}`}
            />
          </Item>
          <Item floatingLabel>
            <Label>Comment</Label>
            <Input
              style={styles.input}
              onChangeText={this.onFormChange.bind(
                this,
                formMapping.COMMENT
              )}
              value={this.props.comment}
            />
          </Item>
          <DatePicker
            style={styles.input}
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
        </Form>
        <Button
          style={styles.saveButton}
          primary
          onPress={() => {
            this.onClickSave();
          }}
        >
          <Text> Save </Text>
        </Button>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  saveButton: {
    left: PHONE_DIMENSIONS.width - 100,
    bottom: 10,
    position: "absolute"
  },
  input: {
    width: PHONE_DIMENSIONS.width,
    padding: 100
  },
  card: {
    width: PHONE_DIMENSIONS.width,
    height: PHONE_DIMENSIONS.height / 3,
    top: PHONE_DIMENSIONS.height / 3
  }
});

const mapStateToProps = state => {
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
      formChanged: formChanged,
      formCleared: formCleared
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentForm);
