import fetch from "isomorphic-fetch";
import {stringify} from "querystring";
export const setUserByToken = value => (async () => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`https://auth.ikindness.cn/api/verify?sso_token=${value}`)).json();
		if(code){
			return {
				type: "dialog_message",
				value: message
			};
		}
		return {
			type: "user",
			value: data,
			ok: 1
		};
	}catch(e){
		return {
			type: "dialog_message",
			value: "网络异常"
		};
	}
})();
export const getBehavior = value => (async () => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`https://auth.ikindness.cn/api/behavior?user=${value}`)).json();
		if(code){
			return {
				type: "dialog_message",
				value: message
			};
		}
		return {
			type: "behavior",
			value: data,
			ok: 1
		};
	}catch(e){
		return {
			type: "dialog_message",
			value: "网络异常"
		};
	}
})();
export const match = (user, articleId) => (async () => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`https://auth.ikindness.cn/api/match?user=${user}&article_id=${articleId}`)).json();
		if(code){
			return {
				type: "dialog_message",
				value: message
			};
		}
		return {
			type: "matched_user",
			value: data,
			ok: 1
		};
	}catch(e){
		return {
			type: "dialog_message",
			value: "网络异常"
		};
	}
})();
export const reset = (user, password, sso_token, referer = default_referer) => (async () => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`https://auth.ikindness.cn/api/reset?referer=${referer}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Bearer ${sso_token}`
			},
			body: stringify({user, password})
		})).json();
		if(code){
			return {
				type: "dialog_message",
				value: message
			};
		}
		return {
			type: "reset",
			value: data,
			ok: 1
		};
	}catch(e){
		return {
			type: "dialog_message",
			value: "网络异常"
		};
	}
})();