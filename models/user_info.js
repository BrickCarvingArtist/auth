export default (sequelize, {INTEGER, STRING}) => sequelize.define("user_info", {
	id: {
		type: INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	user_id: {
		type: STRING(11),
		unique: true
	},
	avator: {
		type: STRING(100)
	}
}, {
	underscored: true,
	paranoid: true
});