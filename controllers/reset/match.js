import {success, error} from "../../utils";
import {match} from "../../services/user";
export default () => async ctx => {
	const {
		user,
		article_id
	} = ctx.query;
	try{
		ctx.body = success(await match({
			tel: user,
			article_id
		}));
	}catch(e){
		ctx.body = error({
			code: e.code || 5000000700,
			ctx,
			e
		});
	}
};