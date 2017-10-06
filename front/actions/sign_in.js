import {stringify} from "querystring";
import {asyncFormAction} from "./utils";
import {DEFAULT_REFERER} from "../configs";
export const signIn = (user, password, referer = DEFAULT_REFERER) => asyncFormAction({
	method: "POST",
	path: `/api/in?${stringify({
		referer
	})}`,
	body: stringify({
		user,
		password
	})
}, value => ({
	type: "SIGNED_IN",
	value,
	ok: 1
}))();