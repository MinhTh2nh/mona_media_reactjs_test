import React from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./slices/store";
import { PersistGate } from 'redux-persist/integration/react';
import ReactDOM from "react-dom";
import App from "./App";
import './index.css'
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
