import express from 'express';
import { addCompany } from './companyController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addCompany);

export default router;