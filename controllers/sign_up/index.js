import {URL} from "url";
import {success, error} from "../../utils";
import {signUp, signIn} from "../../services/user";
export default () => async ctx => {
	const {user, password} = ctx.request.body;
	try{
		let referer = await signUp({
			tel: user,
			password
		});
		const ssoToken = await signIn({
			tel: user,
			password
		});
		ctx.cookies.set("sso_token", ssoToken, {
			maxAge: 60 * 60 * 24 * 1000
		});
		referer = new URL(referer || "https://punchy.ikindness.cn/");
		referer.searchParams.append("sso_token", ssoToken);
		ctx.body = success(referer.href);
	}catch(e){
		ctx.body = error({
			code: e.code || 5000000301,
			ctx,
			e
		});
	}
};