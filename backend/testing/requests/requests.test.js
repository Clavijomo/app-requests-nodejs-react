import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import * as requestController from '../../controllers/requestController';
import Request from '../../models/Requests';
import User from '../../models/User';

User.find = jest.fn();
Request.save = jest.fn();
Request.findOne = jest.fn();
Request.deleteOne = jest.fn();

jest.mock('../../validations/request.js', () => ({
    description: jest.fn(),
    email: jest.fn(),
    subject: jest.fn(),
    typeRequest: jest.fn(),
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Request Controller Testing', () => {
    const req = {
        body: {
            description: "Test description",
            subject: "Test subject",
            typeRequest: 1,
            email: "test@example.com"
        },
        params: {
            code: "test-code"
        }
    };

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    describe('Create request', () => {
        it('Should return 404 if the user does not exist', async () => {
            User.find.mockResolvedValueOnce(null);

            await requestController.createRequest(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "El correo no existe para crear una solicitud" });
        });

        it('Should create a request successfully', async () => {
            User.find.mockResolvedValueOnce({ email: 'test@example.com' });

            Request.prototype.save = jest.fn().mockResolvedValueOnce(true);

            await requestController.createRequest(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: "Solicitud creada exitosamente" });

            expect(Request.prototype.save).toHaveBeenCalledTimes(1);
        });
    });

    describe('Request Controller - Delete Request', () => {
        const req = {
            params: {
                code: 'test-code'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        it('Should return 404 if the request does no exist', async () => {
            Request.findOne.mockResolvedValueOnce(null);

            await requestController.deleteRequest(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "La solicitud no existe" });
        });

        it('Should delete the request successfully', async () => {
            Request.findOne.mockResolvedValueOnce({ code: "test-code" });
            Request.deleteOne.mockResolvedValueOnce({ deletedCount: 1 });
            await requestController.deleteRequest(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith('Successfully deleted one document.');
        });

        it('Should handle delete failure correctly', async () => {
            Request.findOne.mockResolvedValueOnce({ code: 'test-code' });
            Request.deleteOne.mockResolvedValueOnce({ deletedCount: 0 });

            await requestController.deleteRequest(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: "Solicitud creada exitosamente" });
        });

        it("Should handle server error", async () => {
            Request.findOne.mockRejectedValueOnce(new Error("Server error"));

            await requestController.deleteRequest(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Hubo un error", error: "Server error" });
        })
    })
});
