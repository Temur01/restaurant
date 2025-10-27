export interface Category {
  id: number;
  name: string;
  ordernumber?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Meal {
  id: number;
  name: string;
  image?: string;
  ingredients: string[];
  description: string;
  price: number;
  ordernumber?: number;
  category: string; // Keep for backward compatibility
  category_id?: number;
  category_info?: Category;
  created_at?: string;
  updated_at?: string;
}

