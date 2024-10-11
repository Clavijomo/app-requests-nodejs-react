import cors from 'cors';

const ACCEPTED_ORIGIN = [
    "http://localhost:5173",
    "https://app-requests-front.netlify.app"
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGIN } = {}) => cors({
    origin: (origin, call) => {
        if (acceptedOrigins.includes(origin)) {
            return call(null, true);
        }

        if (!origin) {
            return call(null, true);
        }

        return call(new Error('Not Allowed by CORS'));
    }
})