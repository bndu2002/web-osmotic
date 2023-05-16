const express = require('express')
const router = express.Router()
const { registerUser, loginUser, updateUser } = require('../controller/userController');
const { authenticate } = require('../auth/auth')

router.get('/test', (req, res) => {
    return res.status(200).send({ status: true, message: "App running" })
})

router.post('/api/sign-in', registerUser)
router.post('/api/sign-up', loginUser)
router.put('/api/contact/:id', authenticate, updateUser)

module.exports = router