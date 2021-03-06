import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import classNames from "classnames";
import {attachStyles} from "../utils";
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
@attachStyles(() => require("./header"))
export class Header extends Component{
	render(){
		const {
			history,
			headerLeftButton,
			headerRightButton,
			headerType,
			title
		} = this.props;
		return (
			<header className={
				classNames({
					hidden: !(headerType || Reflect.ownKeys(headerLeftButton).length || Reflect.ownKeys(headerRightButton).length)
				})
			}>
				<Button {...headerLeftButton} />
				<strong>{title}</strong>
				<Button {...headerRightButton} />
			</header>
		);
	}
}
export default withRouter(Header);