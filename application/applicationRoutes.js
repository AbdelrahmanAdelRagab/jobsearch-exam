import express from 'express';
import { applyToJob } from './applicationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, applyToJob);

export default router;