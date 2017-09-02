import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {setMessage, setTitle} from "../actions";
import {signIn} from "../actions/sign_in";
import {signUp} from "../actions/sign_up";
import {parse} from "querystring";
@connect(({home}) => ({
	user: home.user,
	signType: home.signType
}), dispatch => bindActionCreators({
	setMessage,
	setTitle
}, dispatch))
@connect()
export default class Distributor extends Component{
	render(){
		const {
			dispatch,
			history,
			setMessage,
			user,
			signType
		} = this.props;
		let ipt;
		return (
			<form>
				<input type="password" className="full" placeholder="请填写密码" maxLength="16" pattern="^.{6,16}$" required ref={
					dom => {
						ipt = dom;
					}
				} />
				<button type="button" className="bottom blue" onClick={
					async () => {
						if(!ipt.checkValidity()){
							return setMessage(["为了您账号的安全起见，密码需要6至16位哦", "密码需要6至16位哦"][signType]);
						}
						if(signType){
							const {
								ok,
								value
							} = dispatch(await signIn(user, ipt.value, parse(location.search.slice(1)).referer));
							return ok && (location.href = value);
						}
						const {
							ok,
							value
						} = dispatch(await signUp(user, ipt.value));
						ok && (location.href = value);
					}
				}>{
					["注册", "登录"][signType]
				}</button>
			</form>
		);
	}
}