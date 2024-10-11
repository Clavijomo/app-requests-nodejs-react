import * as authController from '../../controllers/authController.js';
import User from '../../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { describe, it, expect, jest } from '@jest/globals';
import { Validation } from '../../validations/user.js';

jest.mock('../../models/User');
jest.mock('bcrypt');

jwt.sign = jest.fn((payload, secret, _, callback) => {
    callback(null, 'mockedToken');
});

User.findOne = jest.fn();
User.prototype.save = jest.fn();
bcrypt.compare = jest.fn();
bcrypt.hash = jest.fn();

Validation.password = jest.fn();
Validation.email = jest.fn();

describe('Auth Controller - Login', () => {
    const req = {
        body: {
            email: "test@example.com",
            password: "password12345"
        }
    }

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    }

    it('Return 400 if the user no exist', async () => {
        User.findOne.mockResolvedValue(null);
        await authController.loginUser(req, res)

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Este usuario no existe. Crea una cuenta o inténtalo más tarde' });
    });

    it('Return 400 if the password is incorrect', async () => {
        const mocker = { email: "test@example.com", password: 'hashedpassword' };
        User.findOne.mockResolvedValue(mocker);
        bcrypt.compare.mockResolvedValue(false);

        await authController.loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Contraseña incorrecta" });
    });

    it('Return a token if the credentials are correct', async () => {
        const mockUser = { id: "123456", email: "test@example", password: "hashedPassword", role: "New User" };
        User.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockImplementation((payload, secret, options, call) => call(null, 'mockedToken'));

        await authController.loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Sesion iniciada", token: 'mockedToken' });
    });
})

describe('Create user testing', () => {
    const req = {
        body: {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            role: 1
        }
    };

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    it('Return 400 if the email is already in use', async () => {
        User.findOne.mockResolvedValue({ email: "test@example.com" });

        await authController.createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Este email ya está en uso" });
    });

    it('Handle server errors', async () => {
        User.findOne.mockRejectedValue(new Error("Server error"));

        await authController.createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Server error" });
    });
});