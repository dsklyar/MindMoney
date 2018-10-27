import React, { Component } from "react";
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Right,
  Body,
  Left,
  Icon
} from "native-base";
import { connect } from "react-redux";

class PaymentsList extends Component {
  render() {
    return (
      <Container>
        <Content>
          <List
            dataArray={this.props.payments}
            renderRow={payment => (
              <ListItem avatar>
                <Left>
                  <Icon type="Foundation" name="dollar" />
                  <Icon name={(payment.amount < 0) ? "arrow-down" : "arrow-up"} />
                </Left>
                <Body>
                  <Text>{payment.amount}</Text>
                  <Text note>{payment.comment}</Text>
                </Body>
                <Right>
                  <Text note>
                    {new Date(payment.date).toLocaleDateString("en-US")}
                  </Text>
                </Right>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    payments: state.payments
  };
};

export default connect(mapStateToProps)(PaymentsList);
