import {resolve} from "path";
import {ERROR} from "../configs";
import {appendFile} from "./";
const getResult = (code, comment) => {
	let message = ERROR[code] || "系统繁忙";
	if(comment){
		message = `${comment}有误，${message}`;
	}
	return {
		code,
		message
	};
};
const format = a => a < 10 ? `0${a}` : a;
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
				headers
			} = ctx;
			m = `${method} | ${path} | ${headers["x-forwarded-for"]} | `;
		}
		await appendFile(resolve(__dirname, `../logs/error/${y}${mon}${d}.log`), `${"-".repeat(10)} | ${m}${y}-${mon}-${d} ${h}:${min}:${s} | ${"-".repeat(10)}\n${code} - ${message} - ${e}\n`, "utf-8");
	}catch(err){
		console.dir(err);
		console.log("打印日志错误！");
	}
};
export default ({code, comment, ctx, e}) => {
	e && console.dir(e);
	const result = getResult(code, comment);
	writeErrorLog(ctx, code, result.message, e);
	return result;
};