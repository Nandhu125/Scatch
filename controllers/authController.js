const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {generateToken} = require("../utils/generateToken");


module.exports.registerUser = async (req, res) => {
    try {
        let {fullname, email, password} = req.body;

        let user = await userModel.findOne({email: email});
        if (user) return res.status(401).send("User already exists, Please Login");

        bcrypt.genSalt(10,(err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message)
            else {
                let user = await userModel.create({
                    fullname,
                    email,
                    password: hash
                });

                let token = generateToken(user);
                res.cookie("token", token);
                res.redirect("/shop");
            };
            })
        })
    } catch (error) {
        // res.status(500).send(error)

    }

}

module.exports.loginUser = async function (req, res) {
    let {email, password} = req.body;

    let user = await userModel.findOne({email: email})
    if(!user){
        req.flash("error", "Email or Password is incorrect");
        return res.redirect("/");
    };

    bcrypt.compare(password, user.password, (err, result) => {
        if(result){
            let token = generateToken(user);
            console.log(token);
            res.cookie("token", token);
            res.redirect("/shop");
        }
        else{
            req.flash("error", "Email or Password is incorrect");
            return res.redirect("/");
        }
    })
};

module.exports.logoutUser = function (req, res) {
    res.cookie("token", "");
    res.redirect("/");
}