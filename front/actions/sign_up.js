import fetch from "isomorphic-fetch";
import {stringify} from "querystring";
export const signUp = (user, password) => (async () => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch("https://auth.ikindness.cn/api/up", {
			method: "PUT",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: stringify({user, password})
		})).json();
		if(code){
			return {
				type: "DIALOG_MESSAGE",
				value: message
			};
		}
		return {
			type: "SIGNED_IN",
			value: data,
			ok: 1
		};
	}catch(e){
		return {
			type: "DIALOG_MESSAGE",
			value: "网络异常"
		};
	}
})();