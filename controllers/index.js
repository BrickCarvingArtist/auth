import {sequelize} from "../services";
import {SERVER} from "../configs";
import {error} from "../utils";
import user from "./user";
import page from "./page";
export default async app => {
	try{
		await sequelize.authenticate();
		console.log("Succeed to connect mysql!");
	}catch(e){
		console.log(`Failed to connect mysql!\n${e}`);
		process.exit();
	}
	app
		.use(user())
		.use(page())
		.listen(SERVER.port)
		.on("error", e => {
			error({
				code: 5009999999,
				e
			});
		});
	console.log(`Server started on port ${SERVER.port}.`);
};