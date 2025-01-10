import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import {
  CreateProductDTO,
  UpdateProductDTO,
  ProductFilters,
} from '../types/product.types';
import { ApiError } from '../utils/api-error';

export const ProductController = {
  async create(
    req: Request<
      Record<string, never>,
      Record<string, never>,
      CreateProductDTO
    >,
    res: Response
  ) {
    try {
      const product = await ProductService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  },

  async list(
    req: Request<
      Record<string, never>,
      Record<string, never>,
      Record<string, never>,
      ProductFilters
    >,
    res: Response
  ) {
    try {
      const products = await ProductService.getProducts(req.query);
      res.json(products);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  },

  async getById(req: Request<{ id: string }>, res: Response) {
    try {
      const product = await ProductService.getProductById(
        Number(req.params.id)
      );
      res.json(product);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  },

  async update(
    req: Request<{ id: string }, Record<string, never>, UpdateProductDTO>,
    res: Response
  ) {
    try {
      const product = await ProductService.updateProduct(
        Number(req.params.id),
        req.body
      );
      res.json(product);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  },

  async delete(req: Request<{ id: string }>, res: Response) {
    try {
      await ProductService.deleteProduct(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  },
};
