export default (state = {}, {type, value}) => {
	switch(type){
	case "PAGE_TITLE":
		process.title === "node" || (document.title = value);
		return {
			...state,
			title: value
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
	case "HEADER_TYPE":
		return {
			...state,
			headerLeftButton: {},
			headerRightButton: {},
			headerType: value
		};
	default:
		return state;
	}
};