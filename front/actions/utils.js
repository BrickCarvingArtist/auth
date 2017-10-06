import fetch from "isomorphic-fetch";
import {SERVER_NAME} from "../configs";
export const SHOULD_NOT_FEEDBACK = 0;
export const asyncAction = (setting, callback, shouldFeedback = 1) => async () => {
	try{
		const {
				path,
				...settings
			} = setting,
			{
				code,
				data,
				message
			} = await (await fetch(`${SERVER_NAME}${path}`, {
				method: "GET",
				credentials: "include",
				...settings
			})).json();
		if(code && shouldFeedback){
			throw message;
		}
		return callback(data, code);
	}catch(e){
		throw e || "网络异常";
	}
};
export const asyncFormAction = ({headers, ...others}, ...rest) => asyncAction({
	headers: {
		"Content-Type": "application/x-www-form-urlencoded",
		...headers
	},
	...others
}, ...rest);