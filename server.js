import express from 'express'
import productsRouter from './routes/products.js'
import usersRouter from './routes/users.js'

//Konfiguerara server
const port = 2023
const app = express()

//Middleware
//-lägger vi till sen för att använda req.body 
//app.use('/api', express.json())

//Routes 
app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)

//starta
app.listen(port, () => {
	console.log(`Server is listening on port ${port}`)
})