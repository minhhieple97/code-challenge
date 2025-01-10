import { getDatabase } from '../config/database';
import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
  ProductFilters,
} from '../types/product.types';

export const ProductRepository = {
  async create(product: CreateProductDTO): Promise<Product> {
    const db = getDatabase();
    const result = await db.run(
      'INSERT INTO products (name, description, price) VALUES (?, ?, ?)',
      [product.name, product.description, product.price]
    );

    const newProduct = await this.findById(result.lastID!);
    if (!newProduct) {
      throw new Error('Failed to create product');
    }
    return newProduct;
  },

  async findAll(filters: ProductFilters): Promise<Product[]> {
    const db = getDatabase();
    let query = 'SELECT * FROM products WHERE 1=1';
    const params: any[] = [];

    if (filters.search) {
      query += ' AND (name LIKE ? OR description LIKE ?)';
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    if (filters.minPrice !== undefined) {
      query += ' AND price >= ?';
      params.push(filters.minPrice);
    }

    if (filters.maxPrice !== undefined) {
      query += ' AND price <= ?';
      params.push(filters.maxPrice);
    }

    return db.all<Product[]>(query, params);
  },

  async findById(id: number): Promise<Product | null> {
    const db = getDatabase();
    const product = await db.get<Product>(
      'SELECT * FROM products WHERE id = ?',
      [id]
    );
    return product || null;
  },

  async update(id: number, product: UpdateProductDTO): Promise<Product | null> {
    const db = getDatabase();
    const updates = Object.entries(product)
      .filter(([_, value]) => value !== undefined)
      .map(([key]) => `${key} = ?`);

    if (updates.length === 0) return this.findById(id);

    const query = `
      UPDATE products 
      SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `;

    await db.run(query, [...Object.values(product), id]);
    return this.findById(id);
  },

  async delete(id: number): Promise<boolean> {
    const db = getDatabase();
    const result = await db.run('DELETE FROM products WHERE id = ?', [id]);
    return result.changes ? result.changes > 0 : false;
  },
};
