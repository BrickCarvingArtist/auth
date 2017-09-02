import Koa from "koa";
import helmet from "koa-helmet";
import logger from "koa-logger";
import controller from "./controllers";
const app = new Koa;
app
	.use(logger())
	.use(helmet());
controller(app);