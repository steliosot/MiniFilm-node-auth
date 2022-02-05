const express = require('express')
const router = express.Router()
const verify = require('./verifyToken')

const User = require('../models/User')
const Film = require('../models/Film')

router.get('/' ,verify, async (req,res) =>{
    //const user_data = await User.findOne({_id:req.user})
    //res.send(user_data)

    const films = await Film.find() // .limit(5)
    res.send(films)
})

module.exports = router;