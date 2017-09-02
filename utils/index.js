import {resolve} from "path";
import {readFile as rf, appendFile as af} from "fs";
import error from "./error";
import Validity from "./validity";
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
export {
	error,
	Validity
};
export const formatSQLAddress = ({dialect, user, password, host, port, dbname}) => [
	dbname,
	user,
	password,
	{
		host,
		port,
		dialect,
		define: {
			charset: "utf8",
			collate: "utf8_general_ci"
		}
	}
];
export class SQLError{
	constructor(settings){
		this.settings = settings;
	}
	getMessage({path, type}){
		return ({
			"notNull Violation": `${this.settings[path]}不能为空`
		})[type] || "系统繁忙";
	}
	message(errors){
		if(errors instanceof Array){
			return `${errors.map(this::this.getMessage).join("；")}。`;
		}
		return this.getMessage(errors.path, errors.type);
	}
};