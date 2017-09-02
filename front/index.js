import React from "react";
import {render} from "react-dom";
import createHistory from "history/createBrowserHistory";
import {createStore, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {ConnectedRouter, routerReducer, routerMiddleware} from "react-router-redux";
import reducers from "./reducers";
import App from "./App";
import "./styles";
const history = createHistory();
const store = createStore(combineReducers({
	...reducers,
	router: routerReducer
}), JSON.parse(localStorage.ik_auth || "{}"), applyMiddleware(routerMiddleware(history)));
store.subscribe(() => {
	localStorage.ik_auth = JSON.stringify(store.getState());
	console.log(store.getState());
});
render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>,
	document.getElementById("app")
);