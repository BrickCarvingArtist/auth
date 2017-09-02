import fetch from "isomorphic-fetch";
export const setUserByInput = value => (async () => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`https://auth.ikindness.cn/api/check?user=${value}`)).json();
		if(code){
			return {
				type: "dialog_message",
				value: message
			};
		}
		return {
			type: "user",
			value,
			hasSigned: data,
			ok: 1
		};
	}catch(e){
		return {
			type: "dialog_message",
			value: "网络异常"
		};
	}
})();
export const setSignType = value => ({
	type: "sign_type",
	value
});