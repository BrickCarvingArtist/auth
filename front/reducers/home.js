export default (state = {
	behavior: [],
	signType: 0
}, {type, value}) => ({
	USER: {
		...state,
		user: value
	},
	SIGN_TYPE: {
		...state,
		signType: value
	},
	BEHAVIOR: {
		...state,
		behavior: value
	},
	MATCHED_USER: {
		...state,
		sso_token: value
	}
}[type]) || state;