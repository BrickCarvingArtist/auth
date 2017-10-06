import React, {Component} from "react";
import classNames from "classnames";
import {delay} from "../../utils";
try{
	require("./dialog");
}catch(e){}
export default class Dialog extends Component{
	state = {
		message: "",
		handleSure: 0
	};
	static async alert(message){
		await Dialog.component.setState({
			message
		});
		await delay(1250);
		await Dialog.component.setState({
			message: ""
		});
		return 1;
	}
	static confirm(message, handleSure){
		Dialog.component.setState({
			message,
			handleSure
		});
	}
	async handleSure(handleSure){
		this.setState({
			handleSure: 0
		});
		handleSure();
	}
	handleCancel(){
		this.setState({
			message: ""
		});
	}
	componentWillUnmount(){
		this.setState({
			handleSure: 0
		});
	}
	render(){
		Dialog.component = this;
		const {
			message,
			handleSure,
			handleCancel
		} = this.state;
		return (
			<dialog className={
				classNames({
					hidden: !message,
					display: message
				})
			}>
				<p>{message}</p>
				{
					handleSure ? (
						<div className="operator">
							<a onClick={this.handleSure.bind(this, handleSure)}>确定</a>
							<a onClick={::this.handleCancel}>取消</a>
						</div>
					) : null
				}
			</dialog>
		)
	}
};
export const alert = Dialog.alert;
export const confirm = Dialog.confirm;