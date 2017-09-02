import {URL} from "url";
import {compare} from "bcrypt";
import {sign} from "jsonwebtoken";
import {TOKEN_SECRET} from "../../configs";
import {success, error} from "../../utils";
export default (sequelize, User) => async ctx => {
	const {user, password} = ctx.request.body,
		tel = user;
	try{
		const user = await User.findOne({
			where: {
				tel
			}
		});
		if(!user){
			return ctx.body = error(5000000401, {
				ctx
			});
		}
		try{
			if(await compare(password, user.password)){
				let {referer} = ctx.query;
				referer = new URL(referer || "https://punchy.ikindness.cn/");
				referer.searchParams.append("sso_token", sign({
					tel
				}, TOKEN_SECRET, {
					expiresIn: 60 * 60 * 24
				}));
				return ctx.body = success(referer.href);
			}
			return ctx.body = error(5000000403, {
				ctx
			});
		}catch(e){
			return ctx.body = error(5000000402, {
				ctx,
				e
			});
		}
	}catch(e){
		ctx.body = error(5000000400, {
			ctx,
			e
		});
	}
};