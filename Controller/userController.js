const jwt = require("jsonwebtoken")
const users = require('../Models/userSchema')
//controller meyhod for user register
exports.register = async (req, res) => {
    //store the user data in db
    const { username, email, password } = req.body
    //check email id present or not
    try {
        const exsistingUser = await users.findOne({ email: email })
        if (exsistingUser) {
            res.status(400).json("Account already exsist")
        } else {
            const newUsers = new users({
                username: username,
                email: email,
                password: password,
                github: "",
                linkedin: "",
                profile: ""
            });
            await newUsers.save()
            res.status(201).json("User registered successfully")
        }
    }
    catch (err) {
        res.status(401).json("register request failed  due to", err)
    }


}
//controller method for user login
exports.login = async (req, res) => {
    console.log("Inside login controller")
    const { email, password } = req.body
    try {
        const exsistingUser = await users.findOne({ email: email, password: password })
        if (exsistingUser) {
            //creating jwt for user session |jwt.sign(payload, secretKey| .sign({(variable to store data),(unique data on hash value should be created)})
            const token = jwt.sign({ userId: exsistingUser._id }, 'userpwd123')
            res.status(201).json({
                data: exsistingUser,
                token: token
            })
            console.log(token)
        } else {
            res.status(401).json('User not found in database')
        }

    } catch (error) {
        res.status(500).jason('Internal server error')
    }
}