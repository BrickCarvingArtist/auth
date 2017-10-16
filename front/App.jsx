import React, {Component} from "react";
import {connect} from "react-redux";
import {Switch, withRouter} from "react-router-dom";
import Header from "./components/Header";
import Dialog from "./components/Dialog";
import Home from "./pages/Home";
import Distributor from "./pages/Distributor";
import Behavior from "./pages/Behavior";
import Reset from "./pages/Reset";
import NotFound from "./pages/NotFound";
import {RouteWithSubRoutes, attachStyles} from "./utils";
export const routes = [
	{
		path: "/",
		exact: true,
		component: Home
	},
	{
		path: "/distributor",
		component: Distributor
	},
	{
		path: "/behavior",
		component: Behavior
	},
	{
		path: "/reset",
		component: Reset
	},
	{
		component: NotFound
	}
];
export default attachStyles(() => require("./styles"))(withRouter(connect(({core}) => core)(({title, headerLeftButton, headerRightButton, headerType}) => [
	<Header key={0} title={title} headerLeftButton={headerLeftButton} headerRightButton={headerRightButton} headerType={headerType} />,
	<Switch key={1}>
		{
			routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
		}
	</Switch>,
	<Dialog key={2} />
])));