import {verify} from "jsonwebtoken";
import {TOKEN_SECRET} from "../configs";
import {success, error} from "../utils";
export default () => async (ctx, next) => {
	const {sso_token} = ctx.query;
	if(!sso_token){
		return ctx.body = error({
			code: 5000000600,
			ctx
		});
	}
	try{
		const {
			tel,
			exp
		} = verify(sso_token, TOKEN_SECRET);
		return ctx.body = success(tel);
	}catch(e){
		return ctx.body = error({
			code: 5000000601,
			ctx,
			e
		});
	}
	await next();
}