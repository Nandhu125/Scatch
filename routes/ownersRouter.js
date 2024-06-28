const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owners-model");

if(process.env.NODE_ENV === "development"){
    router.post("/create", async (req, res) => {
       let owners = await ownerModel.find()
       if(owners.length > 0) return res.send(500).send('You dont have permission to create owner')

        let {fullname, email, password} = req.body

       let createdOwner = await ownerModel.create({
        //    fullname: req.body.fullname,
        //    email: req.body.email,
        //    password: req.body.password
           fullname,
           email,
           password
       })

       res.status(201).send(createdOwner)
    })
}

router.get("/admin", (req, res) => {
    let success = req.flash("success");
    res.render("createproducts", { success });
});


module.exports = router;