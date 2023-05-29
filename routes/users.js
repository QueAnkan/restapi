import express from 'express'
import { getDb } from '../data/database.js'
import {generateUserId} from '../utils/generateId.js'
import { isValidId, isValidUser, userExists } from '../utils/validators.js'

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
	
	await db.read()
	const users = db.data.users
	
	if (isValidUser(mayBeUsers)) {
		if (!userExists(users, mayBeUsers.name, mayBeUsers.password)) {
			mayBeUsers.id = await generateUserId();
			console.log('Generated ID: ', mayBeUsers.id);
			users.push(mayBeUsers);

			await db.write();
			res.status(201).json({ id: mayBeUsers.id });
		} else {
			res.status(409).json({ message: 'Username and password already exists' }); // Conflict
		}
	} else {
		res.sendStatus(400); // Bad request
	}

})

router.delete('/:id', async(req, res) => {
	console.log('Delete One/user; ')
	if( !isValidId(req.params.id)) {
		res.sendStatus(400) //Bad Request
		return
	}
	let id = Number(req.params.id)

	await db.read()

	let mayBeUsers = db.data.users.find(user => user.id === id)
	if(!mayBeUsers) {
		res.sendStatus(404) //Not found
		return
	}
	db.data.users = db.data.users.filter(user => user.id !== id)
	await db.write()
	res.sendStatus(200) //Det är ok!

})


// function generateUserId() {
// 	const highestId = Number(db.data.users.reduce((maxId, currentUser) => {
// 		return Math.max(maxId, currentUser.id) 
// 	}, 0))
// 	console.log('Generate: ', highestId)
// 	return highestId + 1 
	
// }





export default router