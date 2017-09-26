import {parse} from "querystring";
import {success, error} from "../utils";
import {getProfiles} from "../services/user";
export default () => async ctx => {
	try{
		const {user_id} = ctx.query,
			parsedUserId = parse(user_id).user_id;
		ctx.body = success(await getProfiles(Array.isArray(parsedUserId) ? parsedUserId : [user_id]));
	}catch(e){
		ctx.body = error({
			code: 5000000800,
			ctx,
			e
		});
	}
};