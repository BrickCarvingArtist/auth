import {createStore, combineReducers, applyMiddleware} from "redux";
export const configureStore = ({reducers, initialState, enhancers}) => createStore((state, action) => {
	action.type === "CLEAR_CACHES" && (state = {
		core: state.core,
		me: state.me
	});
	return combineReducers(reducers)(state, action);
}, initialState, ...enhancers.map(enhancer => applyMiddleware(enhancer)));