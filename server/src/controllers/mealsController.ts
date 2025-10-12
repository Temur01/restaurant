import { Response } from 'express';
import pool from '../config/database';
import { AuthRequest } from '../middleware/auth';

// Get all meals
export const getAllMeals = async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM meals ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      meals: result.rows
    });
  } catch (error) {
    console.error('Get meals error:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
};

// Get single meal
export const getMealById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM meals WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Taom topilmadi' });
    }

    res.json({
      success: true,
      meal: result.rows[0]
    });
  } catch (error) {
    console.error('Get meal error:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
};

// Create new meal
export const createMeal = async (req: AuthRequest, res: Response) => {
  try {
    const { name, image, description, price, category, ingredients } = req.body;

    if (!name || !image || !description || !price || !category || !ingredients) {
      return res.status(400).json({ message: 'Barcha maydonlar to\'ldirilishi kerak' });
    }

    const result = await pool.query(
      `INSERT INTO meals (name, image, description, price, category, ingredients, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
       RETURNING *`,
      [name, image, description, price, category, ingredients]
    );

    res.status(201).json({
      success: true,
      message: 'Taom muvaffaqiyatli qo\'shildi',
      meal: result.rows[0]
    });
  } catch (error) {
    console.error('Create meal error:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
};

// Update meal
export const updateMeal = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, image, description, price, category, ingredients } = req.body;

    if (!name || !image || !description || !price || !category || !ingredients) {
      return res.status(400).json({ message: 'Barcha maydonlar to\'ldirilishi kerak' });
    }

    const result = await pool.query(
      `UPDATE meals 
       SET name = $1, image = $2, description = $3, price = $4, 
           category = $5, ingredients = $6, updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING *`,
      [name, image, description, price, category, ingredients, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Taom topilmadi' });
    }

    res.json({
      success: true,
      message: 'Taom muvaffaqiyatli yangilandi',
      meal: result.rows[0]
    });
  } catch (error) {
    console.error('Update meal error:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
};

// Delete meal
export const deleteMeal = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM meals WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Taom topilmadi' });
    }

    res.json({
      success: true,
      message: 'Taom muvaffaqiyatli o\'chirildi'
    });
  } catch (error) {
    console.error('Delete meal error:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
};

