const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel')

// REGISTER USER
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new userModel({ name, email, password });
    try {
        await newUser.save();
        res.status(200).json({
            success: true,
            message: "Registered!!!"
        })
    } catch (error) {
        res.status(400).json({
            message: error
        });
    }
});

// USER LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.find({ email, password })
        if (user.length > 0) {
            const currentUser = {
                name: user[0].name,
                email: user[0].email,
                isAdmin:user[0].isAdmin,
                _id:user[0]._id
            }
            res.status(200).send(currentUser)
        }
        else{
            res.status(400).json({
                message:"Login Failed"
            })
        }

    } catch (error) {
        res.status(404).json({
            message:"Something went wrong"
        })

    }
})

// ROUTE TO GET ALL PIZZAS
router.get('/allUsers',async (req, res) => {
    try {
        const users =await userModel.find({});
        res.send(users);
    } catch (error) {
        res.json({
            "error":error
        })
        
    }
});


// router.delete('/del/:id',async (req,res)=>{
//     console.log(req.params.id);
//     res.send(req.params.id);
//     const result= await pizzas.deleteOne({_id:req.params.id })
// })



module.exports = router;