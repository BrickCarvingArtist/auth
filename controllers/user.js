import Router from "koa-router";
import body from "koa-bodyparser";
import {crossDomain, authorize} from "./middlewares";
import validate from "./middlewares/validate";
import signIn from "./sign_in";
import check from "./sign_in/check";
import signUp from "./sign_up";
import verify from "./verify";
import behavior from "./reset/behavior";
import match from "./reset/match";
import reset from "./reset";
import getProfile from "./get_profile";
import getProfiles from "./get_profiles";
import setProfile from "./set_profile";
import setAvatar from "./set_avatar";
import out from "./out";
export default sequelize => {
	// User.sync();
	return new Router({
		prefix: "/api"
	})
	.use(crossDomain("http://localhost:4501"))
	// 登录接口
	.post("/in", body(), validate({
		body: [
			{
				name: "user",
				alias: "tel"
			},
			{
				name: "password"
			}
		],
		query: [
			{
				name: "referer",
				alias: "url",
				required: false
			}
		]
	}), signIn())
	// 检验手机号是否合理接口
	.get("/check", validate({
		query: [
			{
				name: "user",
				alias: "tel"
			}
		]
	}), check())
	// 注册接口
	.put("/up", body(), validate({
		body: [
			{
				name: "user",
				alias: "tel"
			},
			{
				name: "password"
			}
		]
	}), signUp())
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
	}), behavior())
	// 用户行为匹配接口
	.get("/match", validate({
		query: [
			{
				name: "user",
				alias: "tel"
			},
			{
				name: "article_id",
				alias: "number",
				comment: "文章id"
			}
		]
	}), match())
	// 重置密码接口
	.patch("/reset", authorize(), body(), validate({
		body: [
			{
				name: "user",
				alias: "tel"
			},
			{
				name: "password"
			}
		],
		query: [
			{
				name: "referer",
				alias: "url",
				required: false
			}
		]
	}), reset())
	// 获取本人基本资料接口
	.get("/profile", authorize(), getProfile())
	// 批量获取用户基本资料接口
	.get("/profiles", getProfiles())
	// 根据用户获取基本资料接口
	.get("/profile/:id", validate({
		params: [
			{
				name: "id",
				alias: "tel",
				comment: "用户id"
			}
		]
	}), getProfile())
	// 设置基本资料接口
	.patch("/profile", authorize(), body(), validate({
		body: [
			{
				name: "user"
			}
		]
	}), setProfile())
	// 设置头像接口
	.patch("/avatar", authorize(), body(), validate({
		body: [
			{
				name: "avatar",
				alias: "url",
				comment: "用户头像"
			}
		]
	}), setAvatar())
	// 退出登录接口
	.get("/out", out())
	.routes();
};