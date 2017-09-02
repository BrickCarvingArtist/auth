import Sequelize from "sequelize";
import {SERVER, DB} from "../configs";
import {formatSQLAddress, error} from "../utils";
import user from "./user";
import page from "./page";
export default async app => {
	const sequelize = new Sequelize(...formatSQLAddress(DB));
	try{
		await sequelize.authenticate();
		console.log("Succeed to connect mysql!");
	}catch(e){
		console.log(`Failed to connect mysql!\n${e}`);
		process.exit();
	}
	app
		.use(user(sequelize))
		.use(page())
		.listen(SERVER.port)
		.on("error", e => {
			ctx.body = error(5009999999, {
				e
			})
		});
	console.log(`Server started on port ${SERVER.port}.`);
};