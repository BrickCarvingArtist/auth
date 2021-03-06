import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {alert} from "../components/Dialog";
import {basis} from "../actions";
import {setUserByInput, setSignType} from "../actions/home";
@connect(({home}) => ({
	user: home.user
}), dispatch => bindActionCreators({
	...basis,
	setSignType,
	push,
	dispatch
}, dispatch))
export default class Home extends Component{
	componentWillMount(){
		this.props.setTitle("用户中心 | iKindness");
	}
	componentDidMount(){
		this.props.setHeaderType();
	}
	render(){
		const {
			dispatch,
			setSignType,
			push,
			user
		} = this.props;
		let ipt;
		return (
			<form className="page home with-both">
				<input type="tel" className="center" placeholder="请填写手机号" maxLength="11" pattern="^1[3-9]\d{9}$" required ref={
					dom => {
						ipt = dom;
					}
				} defaultValue={user} />
				<button type="button" className="center below_input blue" onClick={
					async () => {
						if(!ipt.checkValidity()){
							return alert("要11位数字才能组合成一个有效的手机号码哦");
						}
						const {hasSigned} = dispatch(await setUserByInput(ipt.value));
						hasSigned || alert("该手机号还未注册，再设置密码就注册好了");
						setSignType(hasSigned || 0);
						push(`/distributor${location.search}`);
					}
				}>继续</button>
			</form>
		);
	}
}