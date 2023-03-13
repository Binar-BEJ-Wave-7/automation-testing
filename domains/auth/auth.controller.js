class AuthController {
    constructor(userModel, bcryptLib, jwtLib, response, errResponse) {
        this.userModel = userModel
        this.bcryptLib = bcryptLib
        this.jwtLib = jwtLib
        this.response = response
        this.errResponse = errResponse
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body

            const isExistUser = await this.userModel.findOne({
                where: {
                    email
                },
                attributes: ['password', 'email', 'id']
            })

            if (!isExistUser) {
                throw new this.errResponse(400, 'User tidak ditemukan di sistem')
            }

            const isMatch = await this.bcryptLib.compare(password, isExistUser.password)

            if (!isMatch) {
                throw new this.errResponse(400, 'Password yang dimasukkan salah, silakan coba kembali :)')
            }

            const accessToken = this.jwtLib.sign({user_id: isExistUser.id}, process.env.JWT_SECRET, {expiresIn: '5m'})

            return res.status(200).json(new this.response(200, accessToken))
        } catch (error) {
            next(error)
        }
    }

    login = this.login.bind(this)
}

module.exports = AuthController