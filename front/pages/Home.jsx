import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {setMessage, setTitle} from "../actions";
import {setUserByInput, setSignType} from "../actions/home";
@connect(({home}) => ({
	user: home.user
}), dispatch => bindActionCreators({
	setMessage,
	setTitle,
	setSignType
}, dispatch))
@connect()
export default class Home extends Component{
	constructor(props){
		super(props);
		this.props.setTitle("登录 | Punchy");
	}
	render(){
		const {
			dispatch,
			history,
			location,
			setMessage,
			setSignType,
			user
		} = this.props;
		let ipt;
		return (
			<form>
				<input type="tel" className="full" placeholder="请填写手机号" maxLength="11" pattern="^1[3-9]\d{9}$" required ref={
					dom => {
						ipt = dom;
					}
				} defaultValue={user} />
				<button type="button" className="bottom blue" onClick={
					async () => {
						if(!ipt.checkValidity()){
							return setMessage("要11位数字才能组合成一个有效的手机号码哦");
						}
						const {hasSigned} = dispatch(await setUserByInput(ipt.value));
						hasSigned || setMessage("该手机号还未注册，再设置密码就注册好了");
						setSignType(hasSigned || 0);
						history.push(`/distributor${location.search}`);
					}
				}>填好了</button>
			</form>
		);
	}
}