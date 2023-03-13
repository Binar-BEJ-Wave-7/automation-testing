const AuthController = require('../domains/auth/auth.controller')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {Response, ErrorResponse} = require('../lib/response.lib')

const jest = require('jest')

const mockUser = jest.mockImplementation(() => {
    return {
        findOne: async (params) => {
            return {
                id: 1,
                email: 'saefulloh@email.com',
                password: '$2a$10$uB4ipw1ncbt.7UQnmK6fI.uiMFuetpoSr7GvalDbcU98ms6DbLQl2'
            }
        }
    }
})

const controller = new AuthController(mockUser, bcrypt, jwt, Response, ErrorResponse)

describe('Testing: AuthController', () => {
    describe('Testing: Login Function', () => {
        it('should return success login user', async (done) => {
            const mockReq = {}
            const mockRes = {}
            const mockNext = {}

            const resp = await controller.login(mockReq, mockRes, mockNext)
            expect(resp).toBe({
                "code": 200,
                "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZGU3NGUxNWUtNzYzNC00ZWY4LWE4ZTUtZGVjNjM0NDU3OGU5IiwiaWF0IjoxNjc4NzIwNTMyLCJleHAiOjE2Nzg3MjA4MzJ9.bCiCtBFo9nUjgXsYPBQbWHqJUCERbKv-Uas_PMB7xSM",
                "err": {}
            })
        })
    })
})