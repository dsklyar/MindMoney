import React, { Component } from "react";
import { StyleSheet, StatusBar } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text
} from "native-base";
import PaymentsList from "../containers/paymentsList.container";
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
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <PaymentsList />
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
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
