import React, { Component } from "react";
import { StyleSheet, StatusBar } from "react-native";
import {
  Container,
  Header,
  Title,
  Button,
  Left,
  Right,
  Body,
  Icon
} from "native-base";
import PaymentsList from "../containers/paymentsList.container";
import ActionFloating from "../containers/actionFloating.container";
import GraphCard from "../containers/graphCard.container";

export default class AppView extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Mind Money</Title>
          </Body>
          <Right />
        </Header>
        <Container>
          <GraphCard />
          <PaymentsList />
          <ActionFloating />
        </Container>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  // TODO:
  // Figure out how to do this on ios
  container: {
    marginTop: StatusBar.currentHeight //prevent from the StatusBar on Android to overlapp with UI
  }
});
