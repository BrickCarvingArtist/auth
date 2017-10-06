import {stringify} from "querystring";
import {asyncAction} from "./utils";
export const setUserByInput = user => asyncAction({
	path: `/api/check?${stringify({
		user
	})}`
}, hasSigned => ({
	type: "USER",
	value: user,
	hasSigned,
	ok: 1
}))();
export const setSignType = value => ({
	type: "SIGN_TYPE",
	value
});