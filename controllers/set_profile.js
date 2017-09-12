import {success, error} from "../utils";
import {setProfile} from "../services/user";
export default () => async ctx => {
	try{
		ctx.body = success(await setProfile({
			tel: ctx.state.tel,
			name: ctx.request.body.user
		}));
	}catch(e){
		ctx.body = error({
			code: e.code || 5000000801,
			ctx,
			e
		});
	}
};