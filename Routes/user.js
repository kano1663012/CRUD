const express = require('express');
const route = express.Router()
const { body, validationResult } = require('express-validator');
const User = require('../models/User.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Secret_data_JWT = 'kjsshahdjhjhdjJDHUJHDSUJAHJHDJASHDHASDHAHDAJHS'

route.get('/', async (req, res) => {
    try {
        res.render('signup')
    } catch (error) {
        console.log(error);
    }
})


route.post('/user',
    [
        body('name', 'Enter Atleast 3 Character').isLength({ min: 3 }),
        body('email', 'Enter a Valid Email').isEmail(),
        body('password', 'Enter Atleast 5 Character').isLength({ min: 5 }),
    ]
    , async (req, res) => {
        const success = false
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ success, error: error.array() })
        }
        try {
            const Chackuser = await User.findOne({ email: req.body.email })
            // console.log(Chackuser);
            if (!Chackuser) {

                const salt = await bcrypt.genSalt(10)
                const hashPass = await bcrypt.hash(req.body.password, salt)
                console.log(hashPass);

                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashPass
                })
                await user.save()

                const data = {
                    user: {
                        id: user.id,
                    }
                }

                const token = jwt.sign(data, Secret_data_JWT)
                console.log(token);
                res.redirect('/home')
                // res.status(201).json({ success: true,authtoken:token});
            } else {
                return res.status(401).json({ success, error: 'USer Already Registered ,Please! Try With Other Details' })
            }
        } catch (error) {
            console.log(error);
        }
    })


route.get('/home', async (req, res) => {
    try {
        const data = await User.find()
        res.render('home', { data })
    } catch (error) {
        console.log(error);
    }
})


route.get('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = await User.findById(id)
        res.render('edit', { data })
    } catch (error) {
        console.log(error);
    }
})


route.post('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = await User.findByIdAndUpdate(id, req.body)
        res.redirect('/home')
    } catch (error) {
        console.log(error);
    }
})

route.get('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = await User.findByIdAndDelete(id)
        res.redirect('/home')
    } catch (error) {
        console.log(error);
    }
})
module.exports = route