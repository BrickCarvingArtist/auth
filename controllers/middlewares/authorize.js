import {verify} from "jsonwebtoken";
import {TOKEN_SECRET} from "../../configs";
import {error} from "../../utils";
export default () => async (ctx, next) => {
	const {authorization} = ctx.headers;
	if(!/^Bearer (.*)$/.test(authorization)){
		return ctx.body = error({
			code: 5000000200,
			ctx
		});
	}
	const sso_token = authorization.match(/^Bearer (.*)$/)[1];
	if(!sso_token){
		return ctx.body = error({
			code: 5000000201,
			ctx
		});
	}
	try{
		const {
			tel,
			exp
		} = verify(sso_token, TOKEN_SECRET);
		ctx.state.tel = tel;
	}catch(e){
		return ctx.body = error({
			code: 5000000202,
			ctx,
			e
		});
	}
	await next();
};