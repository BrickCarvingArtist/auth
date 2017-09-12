import {success, error} from "../../utils";
import {getBehavior} from "../../services/user";
export default () => async ctx => {
	try{
		// 如果用户从未阅读过任何文章便要修改密码，则无法修改
		ctx.body = success(await getBehavior(ctx.query.user));
	}catch(e){
		ctx.body = error({
			code: 5000000602,
			ctx,
			e
		});
	}
};