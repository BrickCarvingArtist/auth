import {resolve} from "path";
import {ERROR} from "../configs";
import {appendFile} from "./";
const getMessage = code => ERROR[code] || "系统繁忙";
const getResult = (code, argName) => {
	let message = getMessage(code);
	argName && (message += `（参数：${argName}）`);
	return {
		code,
		message
	};
};
const format = a => {
	return a < 10 ? `0${a}` : a;
};
const writeErrorLog = async (ctx, code, message, e = "未定义错误对象") => {
	const date = new Date;
	let y = date.getFullYear(),
		mon = date.getMonth() + 1,
		d = date.getDate(),
		h = date.getHours(),
		min = date.getMinutes(),
		s = date.getSeconds();
	mon = format(mon);
	d = format(d);
	h = format(h);
	min = format(min);
	s = format(s);
	try{
		let m = "";
		if(ctx){
			const {
				method,
				path,
				ip
			} = ctx;
			m = `${method} | ${path} | ${ip} | `;
		}
		await appendFile(resolve(__dirname, `../logs/error/${y}${mon}${d}.log`), `${"-".repeat(10)} | ${m}${y}-${mon}-${d} ${h}:${min}:${s} | ${"-".repeat(10)}\n${code} - ${message} - ${e}\n`, "utf-8");
	}catch(e){
		console.log("打印日志错误！");
	}
};
export default (code, {ctx, e, argName}) => {
	e && console.dir(e);
	const result = getResult(code, argName);
	writeErrorLog(ctx, code, result.message, e);
	return result;
};