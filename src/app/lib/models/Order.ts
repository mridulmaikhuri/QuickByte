import { Schema, models, model } from "mongoose";

const orderSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    orders: {
        type: [{
            time: Date,
            items: [{
                name: String,
                image: String,
                price: Number,
                quantity: Number
            }]
        }]
    }
})

const Order = models?.Order || model("Order", orderSchema);
export default Order