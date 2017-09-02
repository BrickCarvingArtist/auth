export default (state = {}, {type, value}) => ({
	PAGE_TITLE: (process.title === "node" || (document.title = value), {
		...state,
		title: value
	}),
	DIALOG_MESSAGE: {
		...state,
		message: value
	}
}[type]) || state;