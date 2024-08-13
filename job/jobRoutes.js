import express from 'express';
import { addJob } from './jobController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addJob);

export default router;