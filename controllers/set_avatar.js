import {success, error} from "../utils";
import {setAvatar} from "../services/user";
export default () => async ctx => {
	try{
		ctx.body = success(await setAvatar({
			user_id: ctx.state.tel,
			avatar: ctx.request.body.avatar
		}));
	}catch(e){
		ctx.body = error({
			code: 5000000900,
			ctx,
			e
		});
	}
};