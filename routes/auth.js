const express = require('express')
const router = express.Router()

const User = require('../models/User')
const {registerValidation,loginValidation} = require('../validations/validation')

const bcrypt = require('bcryptjs') 

const jwt = require('jsonwebtoken')

router.post('/register', async (req,res) =>{

    // Input validation
    const {error} = registerValidation(req.body)
    if(error) { 
        return res.status(400).send({'error':error['details'][0]['message']})
    }

    // Check if user is in database
    const emailExists = await User.findOne({email:req.body.email})
    if(emailExists){
        return res.status(400).send({'error':'User exists'})
    }

    // Hash the password
    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    })
    try{
        const saveUser = await user.save();
        res.send({message:'success', user_id:saveUser._id})
    }catch(err){
        res.status(404).send({message:err})
    }
})

router.post('/login', async (req,res) =>{

     // Input validation
     const {error} = loginValidation(req.body)
     if(error) { 
         return res.status(400).send({'error':error['details'][0]['message']})
     }
 
     // Check if user is in database
     const emailExists = await User.findOne({email:req.body.email})
     if(!emailExists){
         return res.status(400).send({'error':'User does not exist'})
     }

     // Check password
     const passwordValidation = await bcrypt.compare(req.body.password,emailExists.password)
     if(!passwordValidation){
        return res.status(400).send({'error':'Password is wrong'})
    }

    const token = jwt.sign({_id:emailExists._id},process.env.TOKEN_SECRET)
    res.header('auth-token',token).send({'auth-token':token})
})

module.exports = router
