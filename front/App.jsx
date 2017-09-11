import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Header from "./components/Header";
import Dialog from "./components/Dialog";
import Home from "./pages/Home";
import Distributor from "./pages/Distributor";
import Behavior from "./pages/Behavior";
import Reset from "./pages/Reset";
import {setTitle} from "./actions";
import {RouteWithSubRoutes} from "./utils";
export const routes = [
	{
		path: "/",
		exact: true,
		component: Home,
		title: "首页 | Punchy"
	},
	{
		path: "/distributor",
		component: Distributor,
		title: "加入 | Punchy"
	},
	{
		path: "/behavior",
		component: Behavior,
		title: "行为检验"
	},
	{
		path: "/reset",
		component: Reset,
		title: "修改密码"
	}
];
export default withRouter(connect()(({match, dispatch}) => (
	<main>
		{
			match.path == "/" && match.isExact ? [] : <Header />
		}
		{
			routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} dispatch={dispatch} />)
		}
		<Dialog />
	</main>
)));