const express = require('express')

const { sequelize, User } = require('./models')

const app = express()
app.use(express.json())



app.post('/users', async (req, res) => {
    const {name, email, role} = req.body;

    try {
        const user = await User.create({name, email, role})

        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error})
    }
})

app.get('/users', async (req, res) => {

    try {
        const users = await User.findAll()

        return res.json(users)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error})
    }
})

app.listen(8080, async ()=>{
    console.log('Server is running on: http://localhost:8080')
    await sequelize.authenticate()
    console.log("Database connected")
})

