import mongoose from "mongoose";

const completeTransactionSchema = new mongoose.Schema({

}, {
    timestamps: true,
})

const CompleteTransaction = mongoose.model('CompleteTransaction', completeTransactionSchema)

export default CompleteTransactionD