function searchDate(date) {
	if(date !== undefined){return true}
	else{return false}
}
function searchAllDate(One, Two, Three) {
	if(searchDate(One) && searchDate(Two) && searchDate(Three)){return true}
	else {return false}
}


module.exports = {
	searchDate,
	searchAllDate
}