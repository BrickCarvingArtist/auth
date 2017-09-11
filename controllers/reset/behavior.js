import {sequelize} from "../";
import {success, error} from "../../utils";
export default () => async ctx => {
	const {user} = ctx.query;
	try{
		// 如果用户从未阅读过任何文章便要修改密码，则无法修改
		ctx.body = success(await sequelize.query(`SELECT id, title FROM articles RIGHT JOIN (SELECT * FROM (SELECT article_id FROM article_views WHERE user_id IS NULL OR user_id<>${user} GROUP BY article_id ORDER BY rand() LIMIT 9)t1 UNION SELECT article_id FROM article_views WHERE user_id=${user} ORDER BY RAND())t2 ON articles.id=t2.article_id;`, {
			type: sequelize.QueryTypes.SELECT
		}));
	}catch(e){
		ctx.body = error({
			code: 5000000602,
			ctx,
			e
		});
	}
};