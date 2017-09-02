import fetch from "isomorphic-fetch";
import {stringify} from "querystring";
export const signIn = (user, password, referer = default_referer) => (async () => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`https://auth.ikindness.cn/api/in?referer=${referer}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
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
			type: "signed_in",
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