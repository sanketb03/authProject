const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const validator = require('validator')

const addNew = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password)
            throw Error('All fields must be filled')

        if (!validator.isEmail(email))
            throw Error('Email not valid')

        if (!validator.isStrongPassword(password))
            throw Error('Password not strong enough')

        const exists = await User.findOne({ email })
        if (exists)
            throw Error('Email already in use')

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const user = await User.create({ email, password: hash })
        res.status(200).json({ email })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getData = async (req, res) => {
    try {
        const data = await User.find({})
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteData = async (req, res) => {
    try {
        const { email } = req.body
        await User.deleteOne({ email })
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    getData, deleteData, addNew
}