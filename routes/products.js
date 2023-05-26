import express from 'express'
import { getDb } from '../data/database.js'
import { isValidHat} from '../utils/validators.js'
//import { generateProductId } from '../utils/generateId.js'

const router = express.Router()
const db = getDb()

//hämta alla producter
router.get('/', async (req, res) => {
	await db.read()
	let products = db.data.products

	res.send(products)
})

//hämta en produkt utifrån ID
/* router.get('/:id', async (req, res) => {
	let possiblyId = Number(req.params.id)
	
		if(isNaN(possiblyId) || possiblyId < 0){
			res.sendStatus(400)
			return
		}

		await db.read()

		let possibleProduct = db.data.products.find(product => product.id === possiblyId)

		if(!possibleProduct){
			res.sendStatus(404)
			return
		}

		res.send(possibleProduct)
})
 */

//hämta produkter utifrån tags ev till search?
router.get('/:tags' , async (req, res) => {
	let possibleTag = req.params.tags
console.log('this is apossible tag:', possibleTag);
	await db.read()


	let possibleHats = db.data.products.filter(products => products.tags.some( tag => tag === possibleTag))

	if(!possibleHats){
		sendStatus(404)
	}
console.log('possible Hats ',possibleHats);
	res.send(possibleHats)

})

//lägga till nya produkter 
router.post('/', async (req, res) =>{

let possibleNewHat = req.body 
console.log('post possibleNewHat:', possibleNewHat);

if(isValidHat(possibleNewHat)) {
	await db.read()
	possibleNewHat.id = generateProductId()
	db.data.products.push(possibleNewHat)
	await db.write()
	res.send(possibleNewHat)
	console.log('post valid');
}

else {
	res.sendStatus(400)
	console.log('felsöker, post invalid');
}
})

export default router

function generateProductId() {
	const highestId = Number(db.data.products.reduce((maxId, currentProduct) => { return Math.max(maxId,  currentProduct.id)
	}, 0))
	return highestId + 1
}

