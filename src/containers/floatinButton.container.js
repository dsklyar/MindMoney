import React, { Component } from "react";
import { Container, Icon, Fab } from "native-base";
import { StyleSheet } from "react-native";
export default class FloatingButton extends Component {
  render() {
    // NOTE: It should be noted, that Fab won"t work if it is a sibling of a Content !!!
    return (
      <Fab
        direction="up"
        style={styles.fab}
        position="bottomRight">
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