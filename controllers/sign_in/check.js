import {success, error} from "../../utils";
import {check} from "../../services/user";
export default () => async ctx => {
	try{
		ctx.body = success(await check(ctx.query.user));
	}catch(e){
		ctx.body = error({
			code: 5000000300,
			ctx,
			e
		});
	}
};