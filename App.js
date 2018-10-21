import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./src/reducers/index";
import AppView from "./src/components/appView.component";

const store = createStore(rootReducer);
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <Provider store={store}>
        <AppView />
      </Provider>
    );
  }
}
