import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {setTitle} from "../actions";
import {setUserByToken, getBehavior, match} from "../actions/reset";
import {qs} from "../utils";
@connect(({home}) => ({
	user: home.user,
	behavior: home.behavior
}), dispatch => bindActionCreators({setTitle}, dispatch))
@connect()
export default class Behavior extends Component{
	constructor(props){
		super(props);
		this.props.setTitle("行为校验");
	}
	async fetch(){
		const {
			dispatch,
			user
		} = this.props;
		dispatch(await getBehavior(user));
	}
	async componentWillMount(){
		const {sso_token} = qs.parse(location.search.slice(1));
		sso_token && this.props.dispatch(await setUserByToken(sso_token));
		this.fetch();
	}
	render(){
		const {
			dispatch,
			history,
			user,
			behavior
		} = this.props;
		return (
			<form className="behavior">
				<label>以下哪篇文章是您最近阅读过的？</label>
				<fieldset>
					{
						behavior.map(({id, title}, i) => (
							<section key={i} onClick={
								async () => {
									const {ok} = dispatch(await match(user, id));
									if(ok){
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