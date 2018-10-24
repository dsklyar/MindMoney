import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from "./src/store/index";
import AppRouter from "./AppRouter";


// TODO:
// Move this crap into index.js under /src/index.js

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
    // TODO:
    // Add clearing of the persisted state
    return (
      <Provider store={store}>
        <PersistGate loading={<Expo.AppLoading />} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>
    );
  }
}
