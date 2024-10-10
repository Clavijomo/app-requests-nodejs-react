import { Router } from 'express';
import { createRequest, deleteRequest, getAllRequests } from '../controllers/requestController.js'

const router = Router();

router.
    post('/', createRequest)
    .delete('/:code', deleteRequest)
    .get('/', getAllRequests)

export default router