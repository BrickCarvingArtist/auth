import fetch from "isomorphic-fetch";
import {stringify} from "querystring";
const default_referer = "https://punchy.ikindness.cn/";
export const setMessage = value => ({
	type: "dialog_message",
	value
});
export const setTitle = value => ({
	type: "page_title",
	value
});