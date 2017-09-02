import {success} from "../utils";
import error from "../utils/error";
export default (sequelize, User) => async ctx => {
	const {tel} = ctx.state;
	try{
		ctx.body = success(await User.findOne({
			where: {
				tel
			},
			attributes: ["tel", "name", "created_at"]
		}));
	}catch(e){
		ctx.body = error(ctx, e, 50000000);
	}
};