// backend/validations/user.js
export class Validation {
    static name(name) {
        if (typeof name !== 'string') throw new Error('Name must be a string');
        if (name.length < 3) throw new Error('Name must be at least 3 characters long');
    }

    static email(email) {
        if (typeof email !== 'string') throw new Error('Email must be a string');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el formato del correo electrónico
        if (!emailRegex.test(email)) throw new Error('Email must be a valid email address');
    }

    static role(role) {
        const validRoles = [1, 2]; // Roles válidos
        if (!validRoles.includes(role)) throw new Error(`Role must be one of: ${validRoles.join(', ')}`);
    }

    static password(password) {
        if (typeof password !== 'string') throw new Error('Password must be a string');
        if (password.length < 6) throw new Error('Password must be at least 6 characters long');
    }
}
