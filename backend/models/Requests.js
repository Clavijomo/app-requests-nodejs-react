import { Schema, model } from 'mongoose';

const requestSchema = new Schema({
    description: {
        type: String,
        required: true,
        maxLength: 300
    },
    typeRequest: {
        type: Number,
        required: true,
        enum: [1, 2],
        default: 1
    },
    email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: false
    }
});

const Request = model('Request', requestSchema);

export default Request;