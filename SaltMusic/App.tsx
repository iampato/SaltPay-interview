import React from "react";
import AppNavigation from "./src/navigation/stack";
import { Provider } from "react-redux";
import store from "./src/redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;