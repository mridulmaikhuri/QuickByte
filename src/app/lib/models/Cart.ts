import { Schema, models, model } from "mongoose";

const cartSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    items: {
        type: Map,
        of: Number,
        required: true,
    },
});

const Cart = models?.Cart || model("Cart", cartSchema);
export default Cart;