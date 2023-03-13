const router = require('express').Router()
const AuthController = require('./auth.controller')

const controller = new AuthController()

router.post('/auth/login', controller.login)

module.exports = router