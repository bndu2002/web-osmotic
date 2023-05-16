const jwt = require('jsonwebtoken')

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers['x-api-key']

        if (!token) return res.status(400).send({ status: false, message: "token must be present" })

        jwt.verify(token, 'okionomicos--ancient-greek', (error, decode) => {
            if (error) {
                return res.status(401).send({ status: false, message: error.message })
            }
            req.decodedToken = decode
            next()
        })
    } catch (error) {
return res.status(500).send({status:false , message : error,message})
    }
}

module.exports = {authenticate}