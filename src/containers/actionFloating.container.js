import React, { Component } from "react";
import { Icon, Fab, Button } from "native-base";
import { StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { devFloatingActivated, populateDummyData } from "../actions";
import { persistor } from "../store/index";
import { ADD_DUMMY_DATA } from "../actions/types";

class ActionFloating extends Component {
  render() {
    // NOTE: It should be noted, that Fab won"t work if it is a sibling of a Content !!!
    return (
      <Fab
        active={this.props.devMode && this.props.devFloatingActive}
        direction="up"
        style={styles.fab}
        position="bottomRight"
        onPress={() => {
          this.props.devMode
            ? this.props.devFloatingActivated()
            : Actions.paymentForm();
        }}
      >
        <Icon name={this.props.devMode ? "hammer" : "add"} />
        <Button
          style={styles.add}
          onPress={() => {
            Actions.paymentForm();
          }}
        >
          <Icon name="add" />
        </Button>
        <Button
          style={styles.flame}
          onPress={() => {
            persistor.purge();
          }}
        >
          <Icon name="flame" />
        </Button>
        <Button
          style={styles.cog}
          onPress={() => {
            this.props.populateDummyData({
              type: ADD_DUMMY_DATA,
              // One month worth of data
              payload: 1
            });
          }}
        >
          <Icon name="cog" />
        </Button>
      </Fab>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: "#5067FF"
  },
  add: {
    backgroundColor: "#34A34F"
  },
  flame: {
    backgroundColor: "#DD5144"
  },
  cog: {
    backgroundColor: "#3B5998"
  }
});

const mapStateToProps = state => {
  return {
    devFloatingActive: state.uiState.devFloatingActive,
    devMode: state.uiState.devMode
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      devFloatingActivated: devFloatingActivated,
      populateDummyData: populateDummyData
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionFloating);
