import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {alert} from "../components/Dialog";
import {basis} from "../actions";
import {reset} from "../actions/reset";
import {parse} from "querystring";
@connect(({home}) => ({
	user: home.user,
	sso_token: home.sso_token
}), dispatch => bindActionCreators({
	...basis,
	dispatch
}, dispatch))
export default class Reset extends Component{
	componentDidMount(){
		const {
			setTitle,
			setHeaderLeftButton
		} = this.props;
		setTitle("修改密码 | Punchy");
		setHeaderLeftButton("back");
	}
	render(){
		const {
			dispatch,
			user,
			sso_token
		} = this.props;
		let ipt;
		return (
			<form className="page reset with-footer">
				<input type="password" className="center" placeholder="请输入新密码" maxLength="16" pattern="^\S{6,16}$" required ref={
					dom => {
						ipt = dom;
					}
				} />
				<button type="button" className="center below_input blue" onClick={
					async () => {
						if(!ipt.checkValidity()){
							return alert("重复密码长度需在6至16位内");
						}
						try{
							const {
								ok,
								value
							} = dispatch(await reset(user, ipt.value, sso_token, parse(location.search.slice(1)).referer));
							if(ok){
								alert("修改成功");
								location.href = value;
							}
						}catch(e){
							alert(e);
						}
					}
				}>确定</button>
			</form>
		);
	}
}