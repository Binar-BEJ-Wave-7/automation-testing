require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})

const request = require('supertest');
const app = require('../app')

const {sequelize} = require('../db/models')

describe('Integration Testing: AuthController', () => {
    describe('Integration Testing: Login Function', () => {
        beforeAll(async () => {
            await sequelize.authenticate()
        });
          
        afterAll(async () => {
            await sequelize.close()
        });
          
        it('should return success login user', async () => {
            const resp = await request(app)
                .post('/v1/auth/login')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({
                    email: 'saefulloh@email.com',
                    password: '12345678'
                })

            expect(resp.body).toHaveProperty('code')
            expect(resp.body).toHaveProperty('data')
            expect(resp.body).toHaveProperty('err')
            expect(resp.body.code).toBe(200)
            expect(resp.body.data).toBeTruthy()
            expect(resp.body.err).toEqual({})
        })

        it('should return user not found', async () => {
            const resp = await request(app)
                .post('/v1/auth/login')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({
                    email: 'wrongemail@email.com',
                    password: '12345678'
                })

            expect(resp.body).toHaveProperty('code')
            expect(resp.body).toHaveProperty('data')
            expect(resp.body).toHaveProperty('err')
            expect(resp.body.code).toBe(400)
            expect(resp.body.data).toEqual({})
            expect(resp.body.err).toEqual('User tidak ditemukan di sistem')

        })

        it('should return password not match', async () => {
            const resp = await request(app)
                .post('/v1/auth/login')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({
                    email: 'saefulloh@email.com',
                    password: '1234568'
                })

            expect(resp.body).toHaveProperty('code')
            expect(resp.body).toHaveProperty('data')
            expect(resp.body).toHaveProperty('err')
            expect(resp.body.code).toBe(400)
            expect(resp.body.data).toEqual({})
            expect(resp.body.err).toEqual('Password yang dimasukkan salah, silakan coba kembali :)')

        })
    })
})