import {success, error} from "../utils";
import {verifyToken} from "../services/user";
export default () => async ctx => {
	const {sso_token} = ctx.query;
	if(!sso_token){
		return ctx.body = error({
			code: 5000000600,
			ctx
		});
	}
	try{
		ctx.body = success(await verifyToken(sso_token));
	}catch(e){
		ctx.body = error({
			code: 5000000601,
			ctx,
			e
		});
	}
}