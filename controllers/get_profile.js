import {success, error} from "../utils";
import {getProfile} from "../services/user";
export default () => async ctx => {
	try{
		ctx.body = success(await getProfile(ctx.state.tel));
	}catch(e){
		ctx.body = error({
			code: 5000000800,
			ctx,
			e
		});
	}
};