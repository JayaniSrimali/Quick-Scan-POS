import mongoose, { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
    billNo: { type: String, required: true, unique: true },
    items: [
        {
            barcode: String,
            name: String,
            price: Number,
            quantity: Number,
            total: Number,
        },
    ],
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    savings: { type: Number, required: true },
    total: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, default: 'PAID' },
    memberId: { type: String },
    stationId: { type: String, default: '#COL-0882' },
}, {
    timestamps: true,
});

export const Order = models.Order || model('Order', OrderSchema);
