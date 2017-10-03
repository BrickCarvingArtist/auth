export default origin => (ctx, next) => {
	ctx.set({
		"Access-Control-Allow-Origin": origin
	});
	return next();
};