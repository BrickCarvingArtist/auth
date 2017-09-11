import {User} from "./";
import {success, error} from "../utils";
export default () => async ctx => {
	const {tel} = ctx.state;
	try{
		ctx.body = success(await User.findOne({
			where: {
				tel
			},
			attributes: ["tel", "name", "created_at"]
		}));
	}catch(e){
		ctx.body = error({
			code: 5000000800,
			ctx,
			e
		});
	}
};