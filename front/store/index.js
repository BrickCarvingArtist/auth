import createHistory from "history/createBrowserHistory";
import {routerReducer, routerMiddleware} from "react-router-redux";
import {configureStore} from "./utils";
import reducers from "../reducers";
export const history = createHistory();
const parseJSONString = string => {
	try{
		string = JSON.parse(string);
	}catch(e){}
	return string;
}
export const store = configureStore({
	reducers: {
		...reducers,
		router: routerReducer
	},
	initialState: ((storage) => {
		Reflect.ownKeys(localStorage).forEach(key => {
			storage[key.replace("ik_auth_", "")] = parseJSONString(localStorage[key])
		});
		delete storage.core;
		return storage;
	})({}),
	enhancers: [
		routerMiddleware(history)
	]
});
store.subscribe(() => {
	const states = store.getState();
	for(let i in states){
		localStorage[`ik_auth_${i}`] = JSON.stringify(states[i]);
	}
	console.log(states);
	process.env.NODE_ENV !== "production" && console.log(states);
});