import React from "react";
import {hydrate} from "react-dom";
import createHistory from "history/createBrowserHistory";
import {createStore, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {ConnectedRouter, routerReducer, routerMiddleware} from "react-router-redux";
import reducers from "./reducers";
import {history, store} from "./store";
import App from "./App";
hydrate(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>,
	document.getElementById("app")
);