import {stringify} from "querystring";
export const setMessage = value => ({
	type: "DIALOG_MESSAGE",
	value
});
export const setTitle = value => ({
	type: "PAGE_TITLE",
	value
});