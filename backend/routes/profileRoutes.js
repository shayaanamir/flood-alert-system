// routes/profileRoutes.js
import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/profileController.js';
import { verifyToken, verifyOwnership } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET user profile by ObjectId (protected route)
router.get('/:userId', verifyToken, verifyOwnership, getUserProfile);

// PUT update user profile by ObjectId (protected route)
router.put('/:userId', verifyToken, verifyOwnership, updateUserProfile);

export default router;