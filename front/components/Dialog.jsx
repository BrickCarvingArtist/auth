import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classNames from "classnames";
import {setMessage} from "../actions";
process.title === "node" || require("../styles/dialog.styl");
@connect(({core}) => ({
	message: core.message
}), dispatch => bindActionCreators({setMessage}, dispatch))
export default class Dialog extends Component{
	render(){
		const {
			message,
			setMessage
		} = this.props;
		message && setTimeout(setMessage, 1000);
		return (
			<dialog className={
				classNames({
					display: message,
					hidden: !message
				})
			}>{message}</dialog>
		);
	}
};