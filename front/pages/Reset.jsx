import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {setTitle, setMessage} from "../actions";
import {reset} from "../actions/reset";
import {parse} from "querystring";
@connect(({home}) => ({
	user: home.user,
	sso_token: home.sso_token
}), dispatch => bindActionCreators({
	setMessage,
	setTitle
}, dispatch))
@connect()
export default class Reset extends Component{
	constructor(props){
		super(props);
		this.props.setTitle("修改密码");
	}
	render(){
		const {
			dispatch,
			setMessage,
			user,
			sso_token
		} = this.props;
		let ipt;
		return (
			<form className="reset">
				<input type="password" className="full" placeholder="请输入新密码" maxLength="16" pattern="^\S{6,16}$" required ref={
					dom => {
						ipt = dom;
					}
				} />
				<button type="button" className="bottom blue" onClick={
					async () => {
						if(!ipt.checkValidity()){
							return setMessage("重复密码长度需在6至16位内");
						}
						const {
							ok,
							value
						} = dispatch(await reset(user, ipt.value, sso_token, parse(location.search.slice(1)).referer));
						ok && (location.href = value);
					}
				}>确定</button>
			</form>
		);
	}
}