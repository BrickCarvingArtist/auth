import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {parse} from "querystring";
import {alert} from "../components/Dialog";
import {basis} from "../actions";
import {setUserByToken, getBehavior, match} from "../actions/reset";
@connect(({home}) => ({
	user: home.user,
	behavior: home.behavior
}), dispatch => bindActionCreators({
	...basis,
	push,
	dispatch
}, dispatch))
@connect()
export default class Behavior extends Component{
	componentWillMount(){
		this.props.setTitle("行为检验 | iKindness");
	}
	async componentDidMount(){
		this.props.setHeaderLeftButton("back");
		try{
			const {sso_token} = parse(location.search.slice(1));
			sso_token && this.props.dispatch(await setUserByToken(sso_token));
		}catch(e){
			alert(e);
		}
		this.fetch();
	}
	async fetch(){
		try{
			const {
				dispatch,
				user
			} = this.props;
			dispatch(await getBehavior(user));
		}catch(e){
			alert(e);
		}
	}
	async matchBehavior(id){
		try{
			const {
				dispatch,
				user
			} = this.props;
			const {ok} = dispatch(await match(user, id));
			if(ok){
				alert("行为检验成功");
				return push(`/reset${location.search}`);
			}
		}catch(e){
			alert(e);
		}
		this.fetch();
	}
	render(){
		return (
			<form className="page behavior with-footer">
				<label>以下哪篇文章是您最近阅读过的？</label>
				<fieldset>
					{
						this.props.behavior.map(({id, title}, i) => (
							<section key={i} onClick={this.matchBehavior.bind(this, id)}>{title}</section>
						))
					}
				</fieldset>
			</form>
		);
	}
}