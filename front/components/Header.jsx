import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import classNames from "classnames";
process.title === "node" || require("../styles/header.styl");
const LEVELS = ["normal", "blue", "red"];
const Button = ({icon, label, to, onClick = function(){}, level = 0}) => {
	if(icon){
		if(to){
			return (
				<Link to={to}>
					<icon className={
						classNames("medium", icon)
					}></icon>
				</Link>
			);
		}
		return <icon className={
			classNames("medium", icon)
		} onClick={onClick}></icon>;
	}
	if(to){
		return <Link to={to} className={
			classNames(LEVELS[level])
		}>{label}</Link>;
	}
	if(onClick){
		return <a onClick={onClick} className={
			classNames(LEVELS[level])
		}>{label}</a>
	}
	return <icon></icon>;
};
@withRouter
@connect(({core}) => ({
	title: core.title,
	headerLeftButton: core.headerLeftButton,
	headerRightButton: core.headerRightButton
}))
export default class Header extends Component{
	render(){
		const {
			history,
			headerRightButton
		} = this.props;
		let {headerLeftButton} = this.props;
		headerLeftButton === "back" && (headerLeftButton = {
			icon: "medium back",
			onClick(){
				history.goBack();
			}
		});
		return (
			<header>
				<Button {...headerLeftButton} />
				<strong>{this.props.title}</strong>
				<Button {...headerRightButton} />
			</header>
		);
	}
};