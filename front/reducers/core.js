export default (state = {}, {type, value}) => {
	switch(type){
		case "page_title":
			return {
				...state,
				title: value
			};
		case "dialog_message":
			return {
				...state,
				message: value
			};
		default:
			return state;
	}
};