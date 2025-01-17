import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import axios from 'axios';


const API_URL = 'https://dummyjson.com/products';

@Injectable()
export class ProductsService {
  async findAll(): Promise<any[]> {
    const response = await axios.get(API_URL);
    return response.data.products;
  }

  async findOne(id: number): Promise<any> {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async create(createProductDto: CreateProductDto): Promise<any> {
    const response = await axios.post(API_URL, createProductDto);
    return response.data;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<any> {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updateProductDto);
      return response.data;
    } catch (error) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async search(name?: string, minPrice?: number, maxPrice?: number): Promise<any[]> {
    const response = await axios.get(API_URL);
    let products = response.data.products;

    if (name) {
      products = products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (minPrice !== undefined) {
      products = products.filter(product => product.price >= minPrice);
    }

    if (maxPrice !== undefined) {
      products = products.filter(product => product.price <= maxPrice);
    }

    return products;
  }
}