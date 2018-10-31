import React, {Component} from "react";
import { Animated, View, PanResponder } from 'react-native';
import { PHONE_DIMENSIONS } from "../constants";
import { deletePayment } from "../actions/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  ListItem,
  Text,
  Right,
  Body,
  Left,
  Icon,
  Card
} from "native-base";


class PaymentEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translateX: new Animated.Value(0)
    }
    this.pan = PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: this.state.translateX}]),
      onPanResponderRelease: (e, {vx, dx}) => {
        const screenWidth = PHONE_DIMENSIONS.width;
        if (Math.abs(vx) >= 0.5 || Math.abs(dx) >= 0.5 * screenWidth) {
          Animated.timing(this.state.translateX, {
            toValue: dx > 0 ? screenWidth : -screenWidth,
            duration: 200
          // }).start(this.props.deletePayment(this.props.payment));
          }).start()
        } else {
          Animated.spring(this.state.translateX, {
            toValue: 0,
            bounciness: 10
          }).start();
        }
      }
    });
  }
  render() {
    return (
      <View style={{
        position: "relative"
      }}>
        {/* <View style={{
          position: "absolute", 
          backgroundColor: "red",
          top: 0,
          right: 0,
          width: PHONE_DIMENSIONS.width,
          height: 50,
          zIndex: -1
        }}>

        </View> */}
        <Animated.View
          style={{
            transform: [{translateX: this.state.translateX}],
            height: 75
          }}
          {...this.pan.panHandlers}
        >
          <ListItem 
            avatar
            >
            <Left>
              <Icon type="Foundation" name="dollar" />
              <Icon name={(this.props.payment.amount < 0) ? "arrow-down" : "arrow-up"} />
            </Left>
            <Body>
              <Text>{this.props.payment.amount}</Text>
              <Text note>{this.props.payment.comment}</Text>
            </Body>
            <Right>
              <Text note>
                {new Date(this.props.payment.date).toLocaleDateString("en-US")}
              </Text>
            </Right>
          </ListItem>
        </Animated.View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    deletePayment: deletePayment
  }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(PaymentEntry);
