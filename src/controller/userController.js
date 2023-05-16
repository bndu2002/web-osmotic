const userModel = require('../model/userModel')
const { isValidMail, isValidName, isValidRequestBody, isValidPassword } = require('../validator/validator');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


const registerUser = async (req, res) => {
    try {

        if (!isValidRequestBody(req.body)) return res.status(400).send({ status: false, message: "Invalid Request" })

        const { name, email, password } = req.body

        if (!name || !isValidName.test(name)) return res.status(400).send({ status: false, message: "Name is mandatory and should be valid" })

        if (!email || !isValidMail.test(email)) return res.status(400).send({ status: false, message: "Email is mandatory and should be valid" })

        const isUniqueEmail = await userModel.findOne({ email: email })

        if (isUniqueEmail) return res.status(400).send({ status: false, message: "Email Already Exists" })

        if (!password || !isValidPassword.test(password)) return res.status(400).send({ status: false, message: "Password is mandatory and should be valid" })

        const createUser = await userModel.create(req.body)

        return res.status(201).send({ status: true, message: "Scuccessflly Registered", data: createUser })


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const loginUser = async (req, res) => {
    try {

        if (!isValidRequestBody(req.body)) return res.status(400).send({ status: false, message: "Invalid Request" })

        const { email, password } = req.body

        if (!email || !password) return res.status(400).send({ status: false, message: "Email and Password are mandatory" })

        const findUser = await userModel.findOne({ email: email, password: password })

        if (!findUser) return res.status(404).send({ status: false, message: "User Not Registered" })

        const token = jwt.sign({
            userId: findUser._id.toString(),
            company: "webOsmotics",
            day: "tuesday"
        }, 'okionomicos--ancient-greek')

        req.header('x-api-key', token)

        return res.status(200).send({ status: true, message: "Successfully logged in", token: token })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const updateUser = async (req, res) => {
    try {

        const id = req.params.id

        if (!mongoose.isValidObjectId(id)) return res.status(400).send({ status: false, message: "Object Id is invalid" })

        const userId = req.decodedToken.userId

        let findUser = await userModel.findById(id)

        if (!findUser) return res.status(404).send({ status: false, message: "User Not Registered" })

        //Authorization
        if (findUser._id != userId) return res.status(403).send({ status: false, message: "Unauthorized access" })

        if (!isValidRequestBody(req.body)) return res.status(400).send({ status: false, message: "Invalid Request" })

        const { email } = req.body

        if (email) {
            const duplicateEmail = await userModel.findOne({ email })
            if (duplicateEmail) return res.status(404).send({ status: false, message: "Email already Exists" })
        }

        const updateDetails = await userModel.findByIdAndUpdate(
            { _id: userId },
            req.body,
            { new: true }
        ).select({ _id: 0, createdAt: 0, updatedAt: 0, __v: 0 })
        return res.status(200).send({ status: true, message: "Successfully Updated", data: updateDetails })


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
module.exports = { registerUser, loginUser, updateUser }