import {stringify} from "querystring";
export const setMessage = value => ({
	type: "DIALOG_MESSAGE",
	value
});
export const basis = {
	setMessage,
	setTitle: value => ({
		type: "PAGE_TITLE",
		value
	}),
	setHeaderLeftButton: (value = {}) => ({
		type: "HEADER_LEFT_BUTTON",
		value
	}),
	setHeaderRightButton: (value = {}) => ({
		type: "HEADER_RIGHT_BUTTON",
		value
	}),
	setFooterType: value => ({
		type: "FOOTER_TYPE",
		value
	})
};