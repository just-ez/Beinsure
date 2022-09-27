
const jwt = require('jsonwebtoken')
const {jwt_Secret_key} = require('../core/config')
const Usermodel = require('../models/user')


module.exports = async (req,res,next)=>{
    const token = req.cookies.Token; 
    try {
        if (token) {
            const noBearer = token.replace(/Bearer\s/gi, '')
       const decoded =  jwt.verify(noBearer,jwt_Secret_key)
       const user = await  Usermodel.findById({_id: decoded._id})
       if (!user) return res.status(404).redirect("/api/signup")
           req.decoded = decoded
       return next()
        }
     return   res.status(403).redirect('/api/signup')
    }
    catch(err){
        res.status(400).send({sucess: false,message: err}) 
    }
}