import {compare, hash} from "bcrypt";
import {URL} from "url";
import {sign} from "jsonwebtoken";
import {TOKEN_SECRET} from "../../configs";
import {success, error} from "../../utils";
export default (sequelize, User) => async ctx => {
	const {
		user,
		password
	} = ctx.request.body;
	const tel = user;
	try{
		const user = await User.findOne({
			where: {
				tel
			}
		});
		if(!user){
			return ctx.body = error(5000000500, {
				ctx
			}); 
		}
		try{
			const pwd = await hash(password, 10);
			try{
				await User.update({
					password: pwd
				}, {
					where: {
						tel
					},
					limit: 1
				});
				let {referer} = ctx.query;
				referer = new URL(referer || "https://punchy.ikindness.cn/");
				referer.searchParams.append("sso_token", sign({
					tel
				}, TOKEN_SECRET, {
					expiresIn: 60 * 60 * 24
				}));
				return ctx.body = success(referer.href);
			}catch(e){
				return ctx.body = error(5000000503, {
					ctx,
					e
				});
			}
		}catch(e){
			return ctx.body = error(5000000502, {
				ctx,
				e
			});
		}
	}catch(e){
		ctx.body = error(5000000501, {
			ctx,
			e
		});
	}
};