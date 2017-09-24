import {success} from "../utils";
export default () => ctx => {
	ctx.cookies.set("sso_token", "", {
		maxAge: 0
	});
	ctx.redirect(ctx.query.referer || "https://punchy.ikindness.cn");
};