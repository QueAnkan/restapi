import express from 'express'
import { getDb } from '../data/database.js'
// import {generateUserId} from '../utils/generateId.js'
import { isValidId, isValidUser } from '../utils/validators.js'

const router = express.Router()
const db = getDb()

router.get('/', async (req, res) => {
	console.log('GET /users: ')
	await db.read()
	res.send(db.data.users)
})

router.get('/:id', async (req, res) => {
	console.log('GET /users/:id')
	if(!isValidId(req.params.id) ) {
		res.sendStatus(400) //Bad request
		return
	} 
	let id = Number(req.params.id)

	await db.read()
	let mayBeUsers = db.data.users.find(user => user.id === id)
	if(!mayBeUsers) {
		res.sendStatus(404) //not found
		return
	}
	res.send(mayBeUsers)

})

router.post('/', async (req, res) => {
	let mayBeUsers = req.body
	console.log('Incoming user: ' , mayBeUsers)

	if (isValidUser(mayBeUsers) ) {
		await db.read()	
		mayBeUsers.id = generateUserId()
		console.log('Genereated ID: ', mayBeUsers.id )
		db.data.users.push(mayBeUsers) 
		await db.write()
		res.status(200).json({ id: mayBeUsers.id})

	} else {
		res.sendStatus(400) //Bad request
	}

})


function generateUserId() {
	const highestId = Number(db.data.users.reduce((maxId, currentUser) => {
		return Math.max(maxId, currentUser.id) 
	}, 0))
	console.log('Generate: ', highestId)
	return highestId + 1 
	
}





export default router