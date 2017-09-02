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