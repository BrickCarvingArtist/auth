import {isPlainObject, isNumber} from "lodash";
export default {
	reg: {
		tel: {
			exp: /^1[3-9]\d{9}$/,
			code: 5009800002
		},
		password: {
			exp: /^.{6,16}$/,
			code: 5009800003
		},
		email: {
			exp: /^[a-zA-Z\d][\w\d]+[a-zA-Z\d]@[a-zA-Z\d]+(?:-[a-zA-Z\d]+)*\.[a-zA-Z]+$/,
			code: 5009800004
		},
		captcha: {
			exp: /^\d{6}$/,
			code: 5009800005
		},
		url: {
			exp: /^https?:\/{2}(?:[a-zA-Z\d]+(?:-[a-zA-Z\d]+)*\.)+[a-zA-Z]+(?:\/.*)?$/,
			code: 5009800006
		}
	},
	_test(key, value, isPlain){
		const expSetting = this.reg[key];
		if(!expSetting){
			throw new Error(`Sorry, unable to validate "${key}".`);
		}
		let result = expSetting.exp.test(value);
		if(result || isPlain){
			return result;
		}
		value || (result = [5009800000, 5009800001][+(value === "")]);
		return result || expSetting.code;
	},
	test(parameterPairs){
		let result = {};
		if(!isPlainObject(parameterPairs)){
			throw new Error("Wrong parameter pairs to test.");
		}
		for(let i in parameterPairs){
			let value = parameterPairs[i]
			result[i] = this._test(i, value, "plain");
		}
		return result;
	},
	testForErrorCode(parameterPairs){
		if(!isPlainObject(parameterPairs)){
			throw new Error("Wrong parameter pairs to test.");
		}
		for(let i in parameterPairs){
			let result = this._test(i, parameterPairs[i]);
			if(isNumber(result)){
				return result;
			}
		}
	}
};