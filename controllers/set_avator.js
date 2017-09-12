import {success, error} from "../utils";
import {setAvator} from "../services/user";
export default () => async ctx => {
	try{
		ctx.body = success(await setAvator({
			user_id: ctx.state.tel,
			avator: ctx.request.body.avator
		}));
	}catch(e){
		ctx.body = error({
			code: 5000000900,
			ctx,
			e
		});
	}
};