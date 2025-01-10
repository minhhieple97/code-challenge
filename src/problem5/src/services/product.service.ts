import { ProductRepository } from '../repositories/product.repository';
import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
  ProductFilters,
} from '../types/product.types';

export const ProductService = {
  async createProduct(product: CreateProductDTO): Promise<Product> {
    return ProductRepository.create(product);
  },

  async getProducts(filters: ProductFilters): Promise<Product[]> {
    return ProductRepository.findAll(filters);
  },

  async getProductById(id: number): Promise<Product> {
    const product = await ProductRepository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  },

  async updateProduct(id: number, product: UpdateProductDTO): Promise<Product> {
    const updatedProduct = await ProductRepository.update(id, product);
    if (!updatedProduct) {
      throw new Error('Product not found');
    }
    return updatedProduct;
  },

  async deleteProduct(id: number): Promise<void> {
    const deleted = await ProductRepository.delete(id);
    if (!deleted) {
      throw new Error('Product not found');
    }
  },
};
