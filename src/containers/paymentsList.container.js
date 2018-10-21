import React, { Component } from "react";
import { Container, Header, Content, List, ListItem, Text } from "native-base";
import { connect } from "react-redux";

class PaymentsList extends Component {
  renderList() {
    console.log(this.props.payments);
    return this.props.payments.map(payment => {
      <ListItem>
        <Text>{payment.amount}</Text>
      </ListItem>;
    });
  }
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <List
            dataArray={this.props.payments}
            renderRow={payment => (
              <ListItem>
                <Text>{payment.amount}</Text>
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
