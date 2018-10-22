import React from "react";
import { Scene, Router } from "react-native-router-flux";

import AppView from "./src/components/appView.component";
import PaymentForm from "./src/containers/paymentForm.container";

const AppRouter = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="appView" component={ AppView } initial />
        <Scene key="paymentForm" component={ PaymentForm } />
      </Scene>
    </Router>
  );
}

export default AppRouter
