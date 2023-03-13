require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})
const express = require('express')

const port = process.env.PORT
const app = express()
const authRouter = require('./domains/auth/auth.routes')

app.use(express.json())

app.use('/v1', authRouter)

app.use((err, req, res, next) => {
    console.log(err)
    const statusCode = err.code || 500
    const errorData = err || {'message': 'Internal Server Error'}

    return res.status(statusCode).json(errorData)
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})