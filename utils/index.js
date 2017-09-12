import {readFile as rf, appendFile as af} from "fs";
import error from "./error";
export const promisify = fn => (...args) => new Promise((resolve, reject) => fn(...args, (e, data) => {
	e && reject(e);
	resolve(data);
}));
export const readFile = promisify(rf);
export const appendFile = promisify(af);
export const success = data => ({
	code: 0,
	data,
	message: "操作成功"
});
export {error};