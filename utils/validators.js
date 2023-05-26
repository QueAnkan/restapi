
function isValidHat (h) {
	if ((typeof h) !== 'object' || h === null){
		return false
	}

let nameIsValid = (typeof h.name) === 'string'
nameIsValid = nameIsValid && h.name !== ''

let priceIsvalid = (typeof h.price) === 'number'
priceIsvalid = priceIsvalid && h.price  >0

let imageIsValid = (typeof h.image) === 'string'
imageIsValid = imageIsValid && h.image !== ''

let tagsIsValid = (typeof h.tags) ==='array'
tagsIsValid = tagsIsValid && h.tags !== []

if(!nameIsValid || !priceIsvalid || !imageIsValid
	|| !tagsIsValid) {
	return false
}
return true

}

function isValidUser(u) {
	if ((typeof u) !== 'object') {
		return false
	} else if ((u === null) ) {
		return false
	}
	let nameIsValid = (typeof u.name) === 'string'
	nameIsValid = nameIsValid && u.name !== ''

	let passwordIsValid = (typeof u.password) === 'string'
	passwordIsValid = passwordIsValid && u.password !== ''

	if(!nameIsValid || !passwordIsValid ) {
		return false
	}
	return true
}

function isValidId(user) {
	let maybeId = Number(user) 
	if(isNaN(maybeId) ) {
		return false 
	}
	return maybeId >= 0  
} 



export {isValidHat, isValidUser, isValidId}