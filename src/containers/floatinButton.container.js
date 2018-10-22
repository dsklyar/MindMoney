import React, { Component } from "react";
import { Icon, Fab } from "native-base";
import { StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
export default class FloatingButton extends Component {
  render() {
    // NOTE: It should be noted, that Fab won"t work if it is a sibling of a Content !!!
    return (
      <Fab
        direction="up"
        style={styles.fab}
        position="bottomRight"
        onPress={() => {Actions.jump("paymentForm")}}>
        <Icon name="add" />
      </Fab>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: "#5067FF"
  }
});