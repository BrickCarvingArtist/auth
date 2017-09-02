import React, {Component} from "react";
import {Switch} from "react-router-dom";
import {connect} from "react-redux";
import Header from "./components/Header";
import Dialog from "./components/Dialog";
import Home from "./pages/Home";
import Distributor from "./pages/Distributor";
import Behavior from "./pages/Behavior";
import Reset from "./pages/Reset";
import {RouteWithSubRoutes} from "./utils";
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
	}
];
export default () => (
	<main>
		<Dialog />
		<Header />
		{
			routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
		}
	</main>
);