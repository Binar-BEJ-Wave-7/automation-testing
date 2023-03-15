const AuthController = require('../domains/auth/auth.controller')
const {Response, ErrorResponse} = require('../lib/response.lib')

const mockAccessToken = 'djscandsjvhbuacewuywebchdbc'
const mockJwt = {
    sign: jest.fn().mockImplementation((payload, secret, options) => mockAccessToken)
}


describe('Testing: AuthController', () => {
    describe('Testing: Login Function', () => {
        it('should return success login user', (done) => {
            const mockUser =  {
                findOne: (params) => {
                    return Promise.resolve({
                        id: 1,
                        email: 'saefulloh@email.com',
                        password: '$2a$10$uB4ipw1ncbt.7UQnmK6fI.uiMFuetpoSr7GvalDbcU98ms6DbLQl2'
                    })
                }
            }

            const mockBcrypt = {
                compare: jest.fn().mockImplementation((plainText, hashText) => Promise.resolve(true))
            }
            
            const controller = new AuthController(mockUser, mockBcrypt, mockJwt, Response, ErrorResponse)

            const mockReq = {
                body: {
                    email: 'someemail@gmail.com',
                    password: '12345678'
                }
            }

            const mockRes = {
                status: jest.fn().mockImplementation((statusCode) => ({
                    json: jest.fn().mockImplementation((any) => new Response(200, mockAccessToken))
                }))
            }

            const mockNext = jest.fn().mockImplementation((err) => err)

            controller.login(mockReq, mockRes, mockNext).then((resp) => {
                expect(resp).toHaveProperty('code')
                expect(resp).toHaveProperty('data')
                expect(resp).toHaveProperty('err')
                expect(resp.code).toBe(200)
                expect(resp.data).toBeTruthy()
                expect(resp.err).toStrictEqual({})
            })
            done()
        })

        it('should return user not found', (done) => {
            const mockUser =  {
                findOne: (params) => {
                    return Promise.resolve(null)
                }
            }

            const mockBcrypt = {
                compare: jest.fn().mockImplementation((plainText, hashText) => Promise.resolve(true))
            }
            
            const controller = new AuthController(mockUser, mockBcrypt, mockJwt, Response, ErrorResponse)
            const mockReq = {
                body: {
                    email: 'someemail@gmail.com',
                    password: '12345678'
                }
            }

            const mockRes = {
                status: jest.fn().mockImplementation((statusCode) => ({
                    json: jest.fn().mockImplementation((any) => new Response(200, mockAccessToken))
                }))
            }

            const mockNext = jest.fn().mockImplementation((err) => err)

            controller.login(mockReq, mockRes, mockNext).then((resp) => {
                expect(resp).toHaveProperty('code')
                expect(resp).toHaveProperty('data')
                expect(resp).toHaveProperty('err')
                expect(resp.code).toBe(400)
                expect(resp.err).toStrictEqual('User tidak ditemukan di sistem')
            })
            done()
        })

        it('should return password not match', (done) => {
            const mockUser =  {
                findOne: (params) => {
                    return Promise.resolve({
                        id: 1,
                        email: 'saefulloh@email.com',
                        password: '$2a$10$uB4ipw1ncbt.7UQnmK6fI.uiMFuetpoSr7GvalDbcU98ms6DbLQl2'
                    })
                }
            }

            const mockBcrypt = {
                compare: jest.fn().mockImplementation((plainText, hashText) => Promise.resolve(false))
            }
            
            const controller = new AuthController(mockUser, mockBcrypt, mockJwt, Response, ErrorResponse)
            const mockReq = {
                body: {
                    email: 'someemail@gmail.com',
                    password: '12345678'
                }
            }

            const mockRes = {
                status: jest.fn().mockImplementation((statusCode) => ({
                    json: jest.fn().mockImplementation((any) => new Response(200, mockAccessToken))
                }))
            }

            const mockNext = jest.fn().mockImplementation((err) => err)

            controller.login(mockReq, mockRes, mockNext).then((resp) => {
                expect(resp).toHaveProperty('code')
                expect(resp).toHaveProperty('data')
                expect(resp).toHaveProperty('err')
                expect(resp.code).toBe(400)
                expect(resp.err).toStrictEqual('Password yang dimasukkan salah, silakan coba kembali :)')
            })
            done()
        })
    })
})