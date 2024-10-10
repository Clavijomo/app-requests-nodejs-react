import { ValidationRequest } from "../validations/request.js";
import Request from '../models/Requests.js'
import User from "../models/User.js";
import { randomUUID } from 'node:crypto';

export const createRequest = async (req, res) => {
    try {
        const { description, subject, typeRequest, email } = req.body;

        ValidationRequest.description(description);
        ValidationRequest.email(email);
        ValidationRequest.subject(subject);
        ValidationRequest.typeRequest(typeRequest);

        const existUser = await User.find({ email });

        if (!existUser) {
            return res.status(404).json({ message: "El correo no existe para crear una solicitud" });
        }

        const newRequest = new Request({ ...req.body, code: randomUUID() });

        await newRequest.save();
        res.status(201).json({ message: "Solicitud creada exitosamente" });

    } catch (error) {
        res.status(500).json({ message: "Hubo un error", error: error.message });
    }
}

export const deleteRequest = async (req, res) => {
    try {
        const { code } = req.params;

        const existRequest = await Request.findOne({ code: code });

        if (!existRequest) {
            return res.status(404).json({ message: "La solicitud no existe" });
        }

        const query = { code: code };
        const result = await Request.deleteOne(query);

        if (result.deletedCount === 1) {
            return res.status(201).json("Successfully deleted one document.");
        }

        res.status(201).json({ message: "Solicitud creada exitosamente" });

    } catch (error) {
        res.status(500).json({ message: "Hubo un error", error: error.message });
    }
}

export const getAllRequests = async (_, res) => {
    try {
        const requests = await Request.find();

        res.status(200).json({ data: requests });
    } catch (err) {
        res.status(500).json({ message: "Hubo un error", error: err.message });
    }
}