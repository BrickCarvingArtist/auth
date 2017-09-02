import {success, error} from "../../utils";
export default (User) => async ctx => {
	const {user} = ctx.query;
	try{
		ctx.body = success(await User.count({
			where: {
				tel: user
			}
		}));
	}catch(e){
		ctx.body = error(5000000300, {
			ctx,
			e
		});
	}
};