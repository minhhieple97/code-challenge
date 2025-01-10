import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { ProductValidator } from '../validators/product.validator';

const router = Router();

router.post('/products', ProductValidator.create, ProductController.create);
router.get('/products', ProductValidator.list, ProductController.list);
router.get(
  '/products/:id',
  ProductValidator.getById,
  ProductController.getById
);
router.put('/products/:id', ProductValidator.update, ProductController.update);
router.delete(
  '/products/:id',
  ProductValidator.delete,
  ProductController.delete
);

export default router;
