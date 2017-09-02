import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {setTitle} from "./actions";
export const RouteWithSubRoutes = route => (
	<Route path={route.path} exact={route.exact} strict={route.strict} render={
		props => (
			route.dispatch(setTitle(route.title)),
			<route.component {...props} routes={route.routes} fetchData={route.fetchData} />
		)
	} />
);
export const qs = {
	parse(query){
		let queries = {};
		query.split("&").forEach(item => {
			let [key, value] = item.split("=");
			queries[key] = value;
		});
		return queries;
	},
	serialize(query){
		let queries = [];
		for(let i in query){
			queries.push(`${i}=${query[i]}`);
		}
		return queries.join("&");
	}
};