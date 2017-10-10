export const attachStyles = styleRequirement => {
	try{
		styleRequirement();
	}catch(e){}
	return target => target;
};
export const delay = milliseconds => new Promise((resolve, reject) => {
	setTimeout(resolve, milliseconds);
});