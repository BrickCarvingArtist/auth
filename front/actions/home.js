import fetch from "isomorphic-fetch";
import {server_name} from "../configs";
export const setUserByInput = value => (async () => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`${server_name}/api/check?user=${value}`)).json();
		if(code){
			return {
				type: "DIALOG_MESSAGE",
				value: message
			};
		}
		return {
			type: "USER",
			value,
			hasSigned: data,
			ok: 1
		};
	}catch(e){
		return {
			type: "DIALOG_MESSAGE",
			value: "网络异常"
		};
	}
})();
export const setSignType = value => ({
	type: "SIGN_TYPE",
	value
});