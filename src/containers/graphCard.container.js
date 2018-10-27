import React, { Component } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
// import { Card, CardItem, Body, Text } from "native-base";
import { LineChart } from "react-native-chart-kit";
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
  WEEKS: "weeks",
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
    console.log(date);
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
  }
  _getDay(date) {
    if (this._isDate) {
      return date.toString().split("T")[0].split("-")[2];
    }
  }

  getConfiguration(rangeMode = this.rangeMode) {
    const config = {
      datasets: []
    };
    switch(rangeMode) {
      case RANGE_MODE.DAYS: {
        const lineData = this.data.reduce((acc, val) => {
          const day = this._getDay(val.date);
          console.log(day);
          (_.isNil(acc[day])) ?  acc[day] = parseInt(val.amount, 10) : acc[day] = 0;
          return acc
        }, {});
        config.labels = Object.keys(lineData);
        config.datasets.push({ data: Object.values(lineData) });
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
    console.log("tick", config);
    return config;
  }
}

class GraphCard extends Component {
  constructor(props) {
    super(props);
    this.graphOperator = new GraphOperator(this.props.payments);
  }
  // componentWillUpdate() {
  //   console.log("updated");
  //   this.graphOperator = new GraphOperator(this.props.payments);
  // }
  getLabels() {
    return this.graphOperator.getConfiguration();
  }
  render() {
    this.getLabels();
    return (
      <LineChart
      // data={{
      //   labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      //   datasets: [{
      //     data: [
      //       Math.random() * 100,
      //       Math.random() * 100,
      //       Math.random() * 100,
      //       Math.random() * 100,
      //       Math.random() * 100,
      //       Math.random() * 100
      //     ]
      //   }]
      // }}
      data={this.getLabels()}
      width={Dimensions.get('window').width} // from react-native
      height={220}
      chartConfig={{
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        }
      }}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
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
