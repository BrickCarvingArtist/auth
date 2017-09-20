import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
export const RouteWithSubRoutes = route => (
	<Route path={route.path} exact={route.exact} strict={route.strict} render={
		props => (
			<route.component {...props} routes={route.routes} fetchData={route.fetchData} />
		)
	} />
);