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
		default:
			return state;
	}
};