import fetch from "isomorphic-fetch";
import {stringify} from "querystring";
import {server_name, default_referer} from "../configs";
export const signIn = (user, password, referer = default_referer) => (async () => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`${server_name}/api/in?referer=${referer}`, {
			method: "POST",
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