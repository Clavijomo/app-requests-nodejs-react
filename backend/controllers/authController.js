import User from "../models/User.js";
import { Validation } from "../validations/user.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const signToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 3600 }, (error, token) => {
            if (error) {
                reject(error);
            } else {
                resolve(token);
            }
        });
    });
};

export const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        Validation.name(name);
        Validation.password(password);
        Validation.role(role);
        Validation.email(email);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Este email ya está en uso" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        const payload = {
            user:
            {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role
            }
        };

        const token = await signToken(payload);
        res.status(201).json({ token });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        Validation.email(email);
        Validation.password(password);

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Este usuario no existe. Crea una cuenta o inténtalo más tarde' })
        };

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });
        const payload = {
            user:
            {
                id: user.id,
                email: user.email,
                role: user.role
            }
        };
        const token = await signToken(payload)

        res.status(200).json({ message: "Sesion iniciada", token: token });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}