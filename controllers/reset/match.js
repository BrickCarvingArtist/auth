import {sign} from "jsonwebtoken";
import {sequelize} from "../";
import {TOKEN_SECRET} from "../../configs";
import {success, error} from "../../utils";
export default () => async ctx => {
	const {
		user,
		article_id
	} = ctx.query;
	if(!article_id){
		return ctx.body = error({
			code: 5000000700,
			ctx
		});
	}
	try{
		const {count} = (await sequelize.query(`SELECT COUNT(user_id) AS count FROM article_views WHERE user_id=${user} AND article_id=${article_id};`, {
			type: sequelize.QueryTypes.SELECT
		}))[0];
		if(count){
			return ctx.body = success(sign({
				tel: user
			}, TOKEN_SECRET, {
				expiresIn: 60 * 60 * 24
			}));
		}
		return ctx.body = error({
			code: 5000000702,
			ctx
		});
	}catch(e){
		ctx.body = error({
			code: 5000000701,
			ctx,
			e
		});
	}
};