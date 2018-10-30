import React, { Component } from "react";
import {
  Container,
  Content,
  List
} from "native-base";
import { connect } from "react-redux";
import PaymentEntry from "../containers/paymentEntry.container"

class PaymentsList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Content>
          <List
            dataArray={this.props.payments}
            renderRow={payment => (<PaymentEntry payment={payment}/>)}
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
