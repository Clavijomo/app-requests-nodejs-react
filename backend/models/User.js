// backend/models/User.js
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    role: {
        type: Number,
        enum: [1, 2],
        default: 'Employee',
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
}, {
    timestamps: true,
});

const User = model('User', userSchema);

export default User;
