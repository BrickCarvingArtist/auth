import {verify} from "jsonwebtoken";
import {TOKEN_SECRET} from "../../configs";
import {error} from "../../utils";
export default () => async (ctx, next) => {
	const {authorization} = ctx.headers,
		ssoTokenByCookie = ctx.cookies.get("sso_token");
	if(!/^Bearer (.*)$/.test(authorization) && !ssoTokenByCookie){
		return ctx.body = error({
			code: 5000000200,
			ctx
		});
	}
	const ssoTokenByHeader = authorization.match(/^Bearer (.*)$/)[1];
	if(!ssoTokenByHeader && !ssoTokenByCookie){
		return ctx.body = error({
			code: 5000000201,
			ctx
		});
	}
	try{
		ctx.state.tel = await new Promise((resolve, reject) => {
			try{
				resolve(verify(ssoTokenByHeader, TOKEN_SECRET).tel);
			}catch(e){
				try{
					resolve(verify(ssoTokenByCookie, TOKEN_SECRET).tel);
				}catch(err){
					reject(e || err);
				}
			}
		});
	}catch(e){
		return ctx.body = error({
			code: 5000000202,
			ctx,
			e
		});
	}
	next();
};