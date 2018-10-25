import React, { Component } from "react";
import { StyleSheet, Dimensions } from "react-native";
// import { Card, CardItem, Body, Text } from "native-base";
import { LineChart } from 'react-native-chart-kit'
import { connect } from "react-redux";
import _ from "lodash";

const phoneDimensions = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};

const DEFAULT_GRAPH_OPERATOR_CONFIG = {
  minMonthLimit: 2,
  maxMonthLimit: 6
};

const RANGE_MODE = {
  MONTHS: "months",
  DAYS: "days",
  YEARS: "years",
  UNKNOWN: "unknown"
};

class GraphOperator {
  constructor(data, config = DEFAULT_GRAPH_OPERATOR_CONFIG) {
    this.data = data;
    this.config = config;
    this._preCalclualte();
  }
  _preCalclualte() {
    this.rangeMode = RANGE_MODE.UNKNOWN;
    const monthsMapping = {
      "1": "January",
      "2": "February",
      "3": "March",
      "4": "April",
      "5": "May",
      "6": "June",
      "7": "July",
      "8": "August",
      "9": "September",
      "10": "October",
      "11": "November",
      "12": "December",
    };

    // Calculate base range
    const months = Object.keys(this.data.reduce((acc, val) => {
      if (this._isDate(val.date)) {
        const month = new Date(val.date).getMonth();
        acc[monthsMapping[month]] = month;
      }
      return acc
    }, {}));

    // Derive RANGE_MODE
    if (months.length < this.config.minMonthLimit) {
      this.rangeMode = RANGE_MODE.DAYS;
    } else if (
      months.length >= this.config.minMonthLimit && 
      months.length < this.config.maxMonthLimit) {
      this.rangeMode = RANGE_MODE.MONTHS;
    } else {
      this.rangeMode = RANGE_MODE.YEARS;
    }
  }
  _isDate(date) {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
  }

  getRange() {
    let range = {};
    switch(this.rangeMode) {
      case RANGE_MODE.DAYS: {
        // Calculate base range
        range = this.data.reduce((acc, val) => {
          if (this._isDate(val.date)) {
            const day = new Date(val.date).getDay();
            console.log(val.amount);
            (acc[day]) ?  acc[day] = parseInt(val.amount, 10) : acc[day] = 0;
          }
          return acc
        }, {});
        break;
      }
      case RANGE_MODE.MONTHS: {
        break;
      }
      case RANGE_MODE.YEARS: {
        break;
      }
      default: {
        break;
      }
    }
    return range;
  }
  getDatasets() {

  }
}

class GraphCard extends Component {
  constructor(props) {
    super(props);
    this.graphOperator = new GraphOperator(this.props.payments);
  }
  getLabels() {
    const range = this.graphOperator.getRange();
    console.log(range);
    return range;
  }
  render() {
    console.log(this.getLabels());
    return (
      <LineChart
        data={{
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June"
          ],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
              ]
            }
          ]
        }}
        width={phoneDimensions.width} // from react-native
        height={phoneDimensions.height / 3}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    );
  }
}
const styles = StyleSheet.create({
  card: {
    width: phoneDimensions.width,
    height: phoneDimensions.height / 3
  }
});

const mapStateToProps = state => {
  return {
    payments: state.payments
  };
};

export default connect(mapStateToProps)(GraphCard);
