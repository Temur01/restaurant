import express from 'express';
import {
  getAllMeals,
  getMealById,
  createMeal,
  updateMeal,
  deleteMeal
} from '../controllers/mealsController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Public route
router.get('/', getAllMeals);
router.get('/:id', getMealById);

// Protected routes (require authentication)
router.post('/', authMiddleware, createMeal);
router.put('/:id', authMiddleware, updateMeal);
router.delete('/:id', authMiddleware, deleteMeal);

export default router;

