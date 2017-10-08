import {stringify} from "querystring";
export const basis = {
	setTitle: value => ({
		type: "PAGE_TITLE",
		value
	}),
	setHeaderType: (value = 0) => ({
		type: "HEADER_TYPE",
		value
	}),
	setHeaderLeftButton: (value = {}) => ({
		type: "HEADER_LEFT_BUTTON",
		value
	}),
	setHeaderRightButton: (value = {}) => ({
		type: "HEADER_RIGHT_BUTTON",
		value
	})
};