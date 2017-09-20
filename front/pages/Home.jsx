import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {basis} from "../actions";
import {setUserByInput, setSignType} from "../actions/home";
@connect(({home}) => ({
	user: home.user
}), dispatch => bindActionCreators({
	...basis,
	setSignType
}, dispatch))
@connect()
export default class Home extends Component{
	componentWillMount(){
		const {
			setTitle
		} = this.props;
		setTitle("首页 | Punchy");
	}
	render(){
		const {
			dispatch,
			history,
			setMessage,
			setSignType,
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
							return setMessage("要11位数字才能组合成一个有效的手机号码哦");
						}
						const {hasSigned} = dispatch(await setUserByInput(ipt.value));
						hasSigned || setMessage("该手机号还未注册，再设置密码就注册好了");
						setSignType(hasSigned || 0);
						history.push(`/distributor${location.search}`);
					}
				}>继续</button>
			</form>
		);
	}
}