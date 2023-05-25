
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

if(!nameIsValid) {
	return false
}
return true

}



export {isValidHat}