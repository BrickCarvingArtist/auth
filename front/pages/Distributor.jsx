import React, {Component} from "react";
import {Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {basis} from "../actions";
import {signIn} from "../actions/sign_in";
import {signUp} from "../actions/sign_up";
import {parse} from "querystring";
@connect(({home}) => ({
	user: home.user,
	signType: home.signType
}), dispatch => bindActionCreators({
	...basis
}, dispatch))
@connect()
export default class Distributor extends Component{
	componentWillMount(){
		const {
			setTitle,
			setHeaderLeftButton
		} = this.props;
		setTitle(`${this.getTitleName()} | Punchy`);
		setHeaderLeftButton("back");
	}
	getTitleName(){
		return ["注册", "登录"][this.props.signType];
	}
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
			<form className="page distributor with-footer">
				<output>{user}</output>
				<input type="password" className="center" placeholder="请填写密码" maxLength="16" pattern="^.{6,16}$" required ref={
					dom => {
						ipt = dom;
					}
				} />
				<button type="button" className="center below_input blue" onClick={
					async () => {
						if(!ipt.checkValidity()){
							return setMessage(["为了您账号的安全起见，密码需要6至16位哦", "密码需要6至16位哦"][signType]);
						}
						if(signType){
							const {
								ok,
								value
							} = dispatch(await signIn(user, ipt.value, parse(location.search.slice(1)).referer));
							if(ok){
								setMessage("登录成功");
								return location.href = value;
							}
						}
						const {
							ok,
							value
						} = dispatch(await signUp(user, ipt.value));
						if(ok){
							setMessage("注册成功");
							return location.href = value;
						}
					}
				}>{
					this.getTitleName()
				}</button>
				<Link to="/behavior">忘记密码</Link>
			</form>
		);
	}
}