const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')("sk_test_51MIBzjJdjvzKrnZ79Dw7QO8Yob5Yq9bh7pM9ry2Xe3B0EXlOJ9XqQIjXizIAFRfQHDIDnZVkijSWDoQDn4I2m0UU00o5OfRstK")
const Order = require('../models/orderModel')


router.post('/placeorder', async (req, res) => {
    const { token, subTotal, currentUser, cartItems } = req.body
    try {
        const customer = await stripe.customers.create({
            email: token.eamil,
            source: token.id,

        })
        const payment = await stripe.charges.create({
            amount: subTotal * 100,
            currency: 'USD',
            customer: customer.id,
            receipt_email: token.email
        }, {
            idempotencyKey: uuidv4()
        })

        if (payment) {
            const newOrder = Order({
                name: currentUser.name,
                email: currentUser.email,
                userid: currentUser._id,
                orderItmes: cartItems,
                orderAmount: subTotal,
                shippingAddress: {
                    street: token.card.address_line1,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    pincode: token.card.address_zip,
                },
                transactionId: payment.source.id,
            });
            newOrder.save();

            res.send('Payment success');

        } else {
            res.send('Payment fail')
        }


    } catch (error) {
        res.status(400).json({
            message: "Something went wrong",
            error: error.stack
        });

    }

});

router.post('/getuserorder', async (req, res) => {
    const { userid } = req.body
    try {
        const orders = await Order.find({ userid })
        res.status(200).send(orders)
    } catch (error) {
        res.status(400).json({
            message: "something went wrong",
            error: error.stack
        });
    }
})

router.get('/getAllOrders', async(req,res)=>{
    
    try {
        const allOrders=await Order.find({});
        res.send(allOrders)
    } catch (error) {
        res.status(400).json({
            message:"Something went wrong"
        })
    }
})


module.exports = router