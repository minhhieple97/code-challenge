import { body, query, param } from 'express-validator';
import { validateRequest } from '../middleware/validate-request';

export const ProductValidator = {
  create: [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ max: 100 })
      .withMessage('Name must be less than 100 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Description must be less than 500 characters'),
    body('price')
      .notEmpty()
      .withMessage('Price is required')
      .isFloat({ min: 0 })
      .withMessage('Price must be a positive number'),
    validateRequest,
  ],

  update: [
    param('id').isInt().withMessage('Invalid product ID'),
    body('name')
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage('Name must be less than 100 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Description must be less than 500 characters'),
    body('price')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('Price must be a positive number'),
    validateRequest,
  ],

  getById: [
    param('id').isInt().withMessage('Invalid product ID'),
    validateRequest,
  ],

  delete: [
    param('id').isInt().withMessage('Invalid product ID'),
    validateRequest,
  ],

  list: [
    query('search')
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage('Search term must be less than 100 characters'),
    query('minPrice')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('Minimum price must be a positive number'),
    query('maxPrice')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('Maximum price must be a positive number')
      .custom((value, { req }) => {
        const minPrice = req.query?.minPrice as string | undefined;
        if (minPrice && Number(value) <= Number(minPrice)) {
          throw new Error('Maximum price must be greater than minimum price');
        }
        return true;
      }),
    validateRequest,
  ],
};
