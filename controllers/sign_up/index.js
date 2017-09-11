import {hash} from "bcrypt";
import {User} from "../";
import {TOKEN_SECRET} from "../../configs";
import {success, error} from "../../utils";
export default () => async ctx => {
	const {user, password} = ctx.request.body;
	try{
		const pwd = await hash(password, 10);
		try{
			await User.create({
				tel: user,
				password: pwd
			});
			ctx.body = success("https://punchy.ikindness.cn/me");
		}catch(e){
			ctx.body = error({
				code: 5000000302,
				ctx,
				e
			});
		}
	}catch(e){
		ctx.body = error({
			code: 5000000301,
			ctx,
			e
		});
	}
};