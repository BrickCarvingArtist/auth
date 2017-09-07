import Validity from "koa-ik-validity";
import {error} from "../../utils"
export default Validity((ctx, code) => {
	return ctx.body = error(code, {
		ctx
	});
});