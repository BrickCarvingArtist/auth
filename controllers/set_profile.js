import {User} from "./";
import {success, error} from "../utils";
export default () => async ctx => {
	const {tel} = ctx.state;
	const {user} = ctx.request.body;
	try{
		const affectedCount = await User.update({
			name: user
		}, {
			where: {
				tel
			}
		});
		if(affectedCount.length){
			return ctx.body = success();
		}
		throw 5000000801;
	}catch(e){
		ctx.body = error({
			code: 5000000801,
			ctx,
			e
		});
	}
};