export default origin => async (ctx, next) => {
	ctx.set({
		"Access-Control-Allow-Origin": origin
	});
	await next();
};