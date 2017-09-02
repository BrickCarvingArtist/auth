export default (state = {
	behavior: []
}, {type, value}) => ({
	user: {
		...state,
		user: value
	},
	sign_type: {
		...state,
		signType: value
	},
	behavior: {
		...state,
		behavior: value
	},
	matched_user: {
		...state,
		sso_token: value
	}
}[type]) || state;