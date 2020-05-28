import { Category } from './category';

export interface Product {
    product_id: number;
    product_title: string;
    product_description: string;
    product_image_url: string
    product_image_alt: string
    product_link: string
    product_price: number
    product_categories?: Category[]
    created_date: Date
    updated_date?: Date
}