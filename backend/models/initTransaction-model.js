import mongoose from 'mongoose'

const initTransactionSchema = new mongoose.Schema({
    MerchantRequestID: {
        type: String,
    },
    CheckoutRequestID: {
        type: String,
    },
    ResponseCode: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number,
    },
    phoneNumber: {
        type: String,
    },
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    }
}, {
    timestamps: true
})

const InitTransaction = mongoose.model('InitTransaction', initTransactionSchema)

export default InitTransaction