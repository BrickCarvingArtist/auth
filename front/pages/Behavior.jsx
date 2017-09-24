import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {basis} from "../actions";
import {setUserByToken, getBehavior, match} from "../actions/reset";
import {parse} from "querystring";
@connect(({home}) => ({
	user: home.user,
	behavior: home.behavior
}), dispatch => bindActionCreators({
	...basis
}, dispatch))
@connect()
export default class Behavior extends Component{
	async componentWillMount(){
		const {
			setTitle,
			setHeaderLeftButton
		} = this.props;
		setTitle("行为检验 | Punchy");
		setHeaderLeftButton("back");
		const {sso_token} = parse(location.search.slice(1));
		sso_token && this.props.dispatch(await setUserByToken(sso_token));
		this.fetch();
	}
	async fetch(){
		const {
			dispatch,
			setMessage,
			user
		} = this.props;
		dispatch(await getBehavior(user));
	}
	render(){
		const {
			dispatch,
			setMessage,
			history,
			user,
			behavior
		} = this.props;
		return (
			<form className="page behavior with-footer">
				<label>以下哪篇文章是您最近阅读过的？</label>
				<fieldset>
					{
						behavior.map(({id, title}, i) => (
							<section key={i} onClick={
								async () => {
									const {ok} = dispatch(await match(user, id));
									if(ok){
										setMessage("行为检验成功");
										return history.push(`/reset${location.search}`);
									}
									this.fetch();
								}
							}>{title}</section>
						))
					}
				</fieldset>
			</form>
		);
	}
}