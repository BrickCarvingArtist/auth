import {stringify} from "querystring";
import {asyncFormAction} from "./utils";
export const signUp = (user, password) => asyncFormAction({
	method: "PUT",
	path: "/api/up",
	body: stringify({
		user,
		password
	})
}, value => ({
	type: "SIGNED_IN",
	value,
	ok: 1
}))();