import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
process.title === "node" || require("../styles/header.styl");
@withRouter
@connect(({core}) => ({
	title: core.title
}))
export default class Header extends Component{
	render(){
		const {history} = this.props;
		return (
			<header>
				<icon className="back" onClick={
					() => {
						history.goBack();
					}
				}></icon>
				<strong>{this.props.title}</strong>
				<icon></icon>
			</header>
		);
	}
};