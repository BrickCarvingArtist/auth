export default (state = {}, {type, value}) => {
	switch(type){
		case "PAGE_TITLE":
			process.title === "node" || (document.title = value);
			return {
				...state,
				title: value
			};
		case "DIALOG_MESSAGE":
			return {
				...state,
				message: value
			};
		case "HEADER_LEFT_BUTTON":
			return {
				...state,
				headerLeftButton: value
			};
		case "HEADER_RIGHT_BUTTON":
			return {
				...state,
				headerRightButton: value
			};
		case "FOOTER_TYPE":
			return {
				...state,
				footerType: value
			};
		default:
			return state;
	}
};