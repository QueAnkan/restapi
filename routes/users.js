import express from 'express'
import { getDb } from '../data/database.js'

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
	let usersId = Number(req.params.id)

	await db.read()
	let mayBeUsers = db.data.users.find(user => user.id === usersId)
	if(!mayBeUsers) {
		res.sendStatus(404) //not found
		return
	}
	res.send(mayBeUsers)

	

})

function isValidId(user) {
	let maybeId = Number(user) 
	if(isNaN(maybeId) ) {
		return false 
	}
	return maybeId >= 0  
} 


export default router