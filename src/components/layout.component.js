import React, { Component } from "react";
import { Container, Header } from "native-base";
import { Col, Grid } from "react-native-easy-grid";
import PaymentsList from "../containers/paymentsList.container";
export default class Layout extends Component {
  render() {
    return (
      <Container>
        <Header />
          <Grid>
            <Col style={{ backgroundColor: "#00CE9F" }}>
              <PaymentsList />
            </Col>
          </Grid>
      </Container>
    );
  }
}