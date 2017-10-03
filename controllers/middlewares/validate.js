import Validity from "koa-ik-validity";
import {error} from "../../utils"
export default Validity((ctx, result) => ctx.body = error({
	...result,
	ctx
}));