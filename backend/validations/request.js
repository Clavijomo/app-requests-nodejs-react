export class ValidationRequest {
    static description(description) {
        if (typeof description !== 'string') throw new Error('El campo Description debe ser un string');
        if (description.length < 3) throw new Error('El campo Description debe contener al menos 3 caracteres');
    }

    static typeRequest(type) {
        const validTypeRequest = [1, 2];
        if (!validTypeRequest.includes(type)) throw new Error(`El tipo de solicitud debe ser uno de: ${validTypeRequest.join(', ')}`);
    }

    static email(email) {
        if (typeof email !== 'string') throw new Error('El email debe ser un string');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) throw new Error('Email no válido');
    }

    static subject(subject) {
        if (typeof subject !== 'string') throw new Error('El campo Asunto debe ser un string');
        if (subject.length < 3) throw new Error('El campo Asunto debe contener al menos 3 caracteres');
    }
}