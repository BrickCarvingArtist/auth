import {success, error} from "../../utils";
import {signUp} from "../../services/user";
export default () => async ctx => {
	const {user, password} = ctx.request.body;
	try{
		ctx.body = success(await signUp({
			tel: user,
			password
		}));
	}catch(e){
		ctx.body = error({
			code: e.code || 5000000301,
			ctx,
			e
		});
	}
};