import Koa from "koa";
import {resolve} from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import {StaticRouter} from "react-router";
import {Provider} from "react-redux";
import {createStore, combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import {matchRoutes} from "react-router-config";
import {readFile, error} from "../utils";
import reducers from "../front/reducers";
import App, {routes} from "../front/App";
const fetchBranchData = (store, path) => {
	const branch = matchRoutes(routes, path);
	const promises = branch.map(({route, match}) => {
		if(route.fetchData){
			return route.fetchData(store, match);
		}
		return Promise.resolve(null);
	});
	return Promise.all(promises);
};
const store = createStore(combineReducers({
	...reducers,
	router: routerReducer
}));
const pageCss = [
	"/auth/index.css"
].map(item => `<link rel="stylesheet" href="${item}" />`).join("");
const pageJs = [
	"/auth/dependencies.js",
	"/auth/index.js"
].map(item => `<script src="${item}"></script>`).join("");
export default () => async (ctx, next) => {
	const {path} = ctx;
	try{
		await fetchBranchData(store, path);
	}catch(e){}
	const html = ReactDOMServer.renderToString(
		<Provider store={store}>
			<StaticRouter location={path} context={{}}>
				<App />
			</StaticRouter>
		</Provider>
	);
	const {title} = store.getState().core;
	try{
		ctx.body = (await readFile(resolve(__dirname, "../views/template.html"), "utf-8"))
			.replace(/<link rel="stylesheet" \/>/, pageCss)
			.replace(/(<title>)(<\/title>)/, `$1${title}$2`)
			.replace(/(<div id="app">)(<\/div>)/, `$1${html}$2${pageJs}`);
	}catch(e){
		ctx.body = error({
			code: 5009900000,
			ctx,
			e
		});
	}
	next();
};