import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {basis} from "../actions";
@connect(() => ({}), dispatch => bindActionCreators(basis, dispatch))
export default class NotFound extends Component{
	componentWillMount(){
		this.props.setTitle("走丢了");
	}
	componentDidMount(){
		const {
			setHeaderLeftButton,
			setHeaderRightButton
		} = this.props;
		setHeaderLeftButton("back");
		setHeaderRightButton();
	}
	render(){
		return (
			<div className="page">404</div>
		);
	}
};