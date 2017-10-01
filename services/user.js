import {compare, hash, verify} from "bcrypt";
import {sign} from "jsonwebtoken";
import {sequelize, User, UserInfo} from "./";
import {TOKEN_SECRET} from "../configs";
User.hasOne(UserInfo, {
	foreignKey: "user_id",
	as: "info"
});
UserInfo.belongsTo(User, {
	foreignKey: "user_id",
	targetKey: "tel",
	as: "info"
});
export const check = tel => User.count({
	where: {
		tel
	}
});
export const signIn = async ({tel, password}) => {
	const user = await User.findOne({
		where: {
			tel
		}
	});
	if(!user){
		throw {
			code: 5000000401
		};
	}
	try{
		if(await compare(password, user.password)){
			return sign({
				tel
			}, TOKEN_SECRET, {
				expiresIn: 60 * 60 * 24
			});
		}
		throw {
			code: 5000000403
		};
	}catch(e){
		throw {
			code: e.code || 5000000402
		};
	}
};
export const signUp = async ({tel, password}) => {
	try{
		const pwd = await hash(password, 10);
		try{
			await User.create({
				tel,
				password: pwd
			});
			return "https://punchy.ikindness.cn/me";
		}catch(e){
			throw {
				code: 5000000302
			};
		}
	}catch(e){
		throw {
			code: e.code || 5000000301
		};
	}
};
export const verifyToken = sso_token => verify(sso_token, TOKEN_SECRET).tel;
export const getBehavior = tel => sequelize.query(`SELECT id, title FROM articles RIGHT JOIN (SELECT * FROM (SELECT article_id FROM article_views WHERE user_id IS NULL OR user_id<>${tel} GROUP BY article_id ORDER BY rand() LIMIT 9)t1 UNION SELECT article_id FROM article_views WHERE user_id=${tel} ORDER BY RAND())t2 ON articles.id=t2.article_id;`, {
	type: sequelize.QueryTypes.SELECT
});
export const match = async ({tel, article_id}) => {
	if((await sequelize.query(`SELECT COUNT(user_id) AS count FROM article_views WHERE user_id=${tel} AND article_id=${article_id};`, {
		type: sequelize.QueryTypes.SELECT
	}))[0]){
		return sign({
			tel
		}, TOKEN_SECRET, {
			expiresIn: 60 * 60 * 24
		});
	}
	throw {
		code: 5000000701
	};
};
export const reset = async ({tel, password, referer}) => {
	const user = await User.findOne({
		where: {
			tel
		}
	});
	if(!user){
		throw {
			code: 5000000500
		}; 
	}
	try{
		const pwd = await hash(password, 10);
		try{
			await User.update({
				password: pwd
			}, {
				where: {
					tel
				},
				limit: 1
			});
			referer = new URL(referer || "https://punchy.ikindness.cn/");
			referer.searchParams.append("sso_token", sign({
				tel
			}, TOKEN_SECRET, {
				expiresIn: 60 * 60 * 24
			}));
			return referer.href;
		}catch(e){
			throw {
				code: 5000000503
			};
		}
	}catch(e){
		throw {
			code: e.code || 5000000502
		};
	}
};
export const getProfile = async tel => {
	const profile = await User.findOne({
		where: {
			tel
		},
		include: [
			{
				model: UserInfo,
				attributes: ["avatar"],
				as: "info",
				on: {
					user_id: sequelize.literal("`user`.`tel`")
				}
			}
		],
		attributes: ["tel", "name", "created_at"],
		raw: true
	}) || {};
	profile.avatar = profile["info.avatar"];
	delete profile["info.avatar"];
	return profile;
};
export const getProfiles = async tels => (await User.findAll({
	where: {
		tel: {
			in: tels
		}
	},
	include: [
		{
			model: UserInfo,
			attributes: ["avatar"],
			as: "info",
			on: {
				user_id: sequelize.literal("`user`.`tel`")
			}
		}
	],
	attributes: ["tel", "name", "created_at"],
	raw: true
})).map(profile => {
	profile.avatar = profile["info.avatar"];
	delete profile["info.avatar"];
	return profile;
});
export const setProfile = async ({tel, name}) => {
	const affectedCount = await User.update({
		name
	}, {
		where: {
			tel
		}
	});
	if(affectedCount.length){
		return 1;
	}
	throw 5000000801;
};
export const setAvatar = async ({user_id, avatar}) => {
	await UserInfo.upsert({
		user_id,
		avatar
	});
	return avatar;
};