const router = require('express').Router()
const AuthController = require('./auth.controller')
const {User} = require('../../db/models') 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {Response, ErrorResponse} = require('../../lib/response.lib')

const controller = new AuthController(User, bcrypt, jwt, Response, ErrorResponse)

router.post('/auth/login', controller.login)

module.exports = router