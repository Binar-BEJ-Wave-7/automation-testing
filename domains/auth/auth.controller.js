const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {User} = require('../../db/models')
const { ErrorResponse, Response } = require('../../lib/response.lib')

class AuthController {
    async login(req, res, next) {
        try {
            const {email, password} = req.body

            const isExistUser = await User.findOne({
                where: {
                    email
                },
                attributes: ['password', 'email', 'id']
            })

            if (!isExistUser) {
                throw new ErrorResponse(400, 'User tidak ditemukan di sistem')
            }

            const isMatch = await bcrypt.compare(password, isExistUser.password)

            if (!isMatch) {
                throw new ErrorResponse(400, 'Password yang dimasukkan salah, silakan coba kembali :)')
            }

            const accessToken = jwt.sign({user_id: isExistUser.id}, process.env.JWT_SECRET, {expiresIn: '5m'})

            return res.status(200).json(new Response(200, accessToken))
        } catch (error) {
            next(error)
        }
    }
}

module.exports = AuthController