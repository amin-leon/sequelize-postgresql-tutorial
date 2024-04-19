const express = require('express')

const { sequelize, User, Post } = require('./models')

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

app.get('/users/:uuid', async (req, res) => {
    const { uuid } = req.params

    try {
        const user = await User.findOne({
            where: {uuid}
        })

        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error})
    }
})


app.delete('/users/:uuid', async (req, res) => {
    const { uuid } = req.params

    try {
        const user = await User.findOne({
            where: {uuid}
        })

        if(user){
            await User.destroy({
                where:{
                    uuid
                }
            })
        }
        return res.json({Message: "User is deleted!"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Something went wrong :)"})
    }
})

app.put('/users/:uuid', async (req, res) => {
    const { uuid } = req.params
    const {name, role, email} = req.body;

    try {
        const user = await User.findOne({
            where: {uuid}
        })

        if(user){
            user.name = name
            user.email = email;
            user.role = role
        }

        await user.save()
        return res.json({Message: "User is updated well"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Something went wrong :)"})
    }
})

app.post('/posts', async (req, res) => {
    const {userUuid, body} = req.body;

    try {
        const user = await User.findOne({
            where: {
                uuid: userUuid
            }
        })
        if(user){
            const post = await Post.create({userId:user.id, body})
            return res.json(post)
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({error})
    }
})

app.get('/posts', async (req, res) => {
    try {
        // [{model: User, as: 'user'}]
        const posts = await Post.findAll({include: 'user'})
        return res.json(posts)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error})
    }
})

app.listen(8080, async ()=>{
    console.log('Server is running on: http://localhost:8080')
    await sequelize.authenticate()
    console.log("Database connected.....")
})

