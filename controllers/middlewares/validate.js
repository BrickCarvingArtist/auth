import {isString, isUndefined, isNumber} from "lodash";
import {Validity, error} from "../../utils";
export default options => async (ctx, next) => {
	const code = Object.entries(options).map(item => ((type, parameters) => {
		let payload = ({
			query: ctx.query,
			params: ctx.params,
			body: ctx.request.body
		})[type];
		if(!payload){
			throw new Error("Wrong setting of type.");
		}
		const code = Validity.testForErrorCode(parameters.reduce((parameterPairs, key) => {
			if(isString(key)){
				return Object.assign({
					[key]: payload[key]
				}, parameterPairs);
			}
			const {
				name,
				alias = name,
				required = true
			} = key,
				value = payload[name];
			if(required && name || (!required && !isUndefined(value))){
				return Object.assign({
					[alias]: value
				}, parameterPairs);
			}
			throw new Error("Wrong setting of parameters.");
		}, {}));
		return code;
	})(...item)).find(item => isNumber(item));
	if(code){
		return ctx.body = error(code, {
			ctx
		});
	}
	await next();
};