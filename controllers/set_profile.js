import {success, error} from "../utils";
export default (sequelize, User) => async ctx => {
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
		ctx.body = error(ctx, e, 50000000);
	}catch(e){
		ctx.body = error(ctx, e, 50000000);
	}
};