import {parse} from "querystring";
import {success, error} from "../utils";
import {getProfiles} from "../services/user";
export default () => async ctx => {
	try{
		const {user_id} = ctx.query;
		ctx.body = success(await getProfiles(Array.isArray(user_id) ? user_id : [user_id]));
	}catch(e){
		ctx.body = error({
			code: 5000000800,
			ctx,
			e
		});
	}
};