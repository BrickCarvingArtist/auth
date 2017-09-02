import {resolve} from "path";
import Router from "koa-router";
import body from "koa-bodyparser";
import signIn from "./sign_in";
import check from "./sign_in/check";
import signUp from "./sign_up";
import verify from "./verify";
import behavior from "./reset/behavior";
import match from "./reset/match";
import reset from "./reset";
import profile from "./profile";
import {crossDomain, validate, authorize} from "./middlewares";
export default sequelize => {
	const User = sequelize.import(resolve(__dirname, "../models/user"));
	// User.sync();
	return new Router({
		prefix: "/api"
	})
	.use(crossDomain("http://localhost:8080"))
	// 登录接口
	.post("/in", body(), validate({
		body: [
			{
				name: "user",
				alias: "tel"
			},
			"password"
		],
		query: [
			{
				name: "referer",
				alias: "url",
				required: false
			}
		]
	}), signIn(sequelize, User))
	// 检验手机号是否合理接口
	.get("/check", validate({
		query: [
			{
				name: "user",
				alias: "tel"
			}
		]
	}), check(User))
	// 注册接口
	.put("/up", body(), validate({
		body: [
			{
				name: "user",
				alias: "tel"
			},
			"password"
		]
	}), signUp(sequelize, User))
	// 根据sso_token获取手机号
	.get("/verify", verify())
	// 用户行为检验问题接口
	.get("/behavior", validate({
		query: [
			{
				name: "user",
				alias: "tel"
			}
		]
	}), behavior(sequelize))
	// 用户行为匹配接口
	.get("/match", validate({
		query: [
			{
				name: "user",
				alias: "tel"
			}
		]
	}), match(sequelize))
	// 重置密码接口
	.patch("/reset", authorize(), body(), validate({
		body: [
			{
				name: "user",
				alias: "tel"
			},
			"password"
		],
		query: [
			{
				name: "referer",
				alias: "url",
				required: false
			}
		]
	}), reset(sequelize, User))
	// 基本资料接口
	.get("/profile", authorize(), profile(sequelize, User))
	.routes();
};