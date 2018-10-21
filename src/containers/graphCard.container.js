import React, { Component } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Card, CardItem, Body, Text } from "native-base";

const phoneDimensions = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};

export default class GraphCard extends Component {
  render() {
    return (
      <Card style={styles.card}>
        <CardItem>
          <Body>
            <Text>Graph Goes here</Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}
const styles = StyleSheet.create({
  card: {
    width: phoneDimensions.width,
    height: phoneDimensions.height / 3
  }
});
