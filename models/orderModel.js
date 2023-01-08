const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'order name require']
    },
    email: {
        type: String,
        require: [true, 'email is required']
    },
    userid: {
        type: String,
        require: true
    },
    orderItmes: [],
    shippingAddress: {
        type: Object,
    },
    orderAmount: {
        type: String,
        require: true
    },
    isDelivered: {
        type: String,
        // require: true
    },
    transactionId: {
        type: String,
        require: true
    }
}, {
    timeStamps: true
})

module.exports = mongoose.model("order", orderSchema);
