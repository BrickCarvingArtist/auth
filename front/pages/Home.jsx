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
			<form className="home">
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
				<div className="etc">
					<h3>开发者信息</h3>
					<div className="row">
						<a className="small" href="https://github.com/BrickCarvingArtist">Github：BrickCarvingArtist</a>
					</div>
					<div className="row">
						<a className="small" href="http://wpa.qq.com/msgrd?v=3&uin=806321554&site=qq&menu=yes">QQ号：806321554</a>
					</div>
					<div className="row">
						<a className="small" href="http://shang.qq.com/wpa/qunwpa?idkey=6ff6f2e96e77e3321c42a756bc7a83a64ac70129da6f3d0a59809afe08346998">QQ群：精通JavaScript</a>
					</div>
				</div>
			</form>
		);
	}
}