import {stringify} from "querystring";
import {asyncAction, asyncFormAction} from "./utils";
import {DEFAULT_REFERER} from "../configs";
export const setUserByToken = sso_token => asyncAction({
	path: `/api/verify?${stringify({
		sso_token
	})}`
}, value => ({
	type: "USER",
	value,
	ok: 1
}))();
export const getBehavior = user => asyncAction({
	path: `/api/behavior?${stringify({
		user
	})}`
}, value => ({
	type: "BEHAVIOR",
	value,
	ok: 1
}))();
export const match = (user, article_id) => asyncAction({
	path: `/api/match?${stringify({
		user,
		article_id
	})}`
}, value => ({
	type: "MATCHED_USER",
	value,
	ok: 1
}))();
export const reset = (user, password, sso_token, referer = DEFAULT_REFERER) => asyncFormAction({
	method: "PATCH",
	path: `/api/reset?${stringify({
		referer
	})}`,
	headers: {
		Authorization: `Bearer ${sso_token}`
	},
	body: stringify({
		user,
		password
	})
}, value => ({
	type: "RESET",
	value,
	ok: 1
}))();