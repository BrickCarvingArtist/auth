import {success, error} from "../../utils";
import {signIn} from "../../services/user";
export default () => async ctx => {
	const {user, password} = ctx.request.body;
	try{
		ctx.body = success(await signIn({
			tel: user,
			password,
			referer: ctx.query.referer
		}));
	}catch(e){
		ctx.body = error({
			code: e.code || 5000000400,
			ctx,
			e
		});
	}
};