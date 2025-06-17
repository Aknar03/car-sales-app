// src/types/cars.d.ts
export interface Car {
  unique_id: number;
  mark_id: string;
  folder_id: string;
  model_name: string;
  generation_name: string;
  modification_id: string;
  price: number;
  year: number;
  run: number;
  engine_type: string;
  transmission?: string;
  gearbox: string;
  drive: string;
  color: string;
  state: string;
  owners_number: string;
  pts: string;
  extras: string;
  images?: {
    image: string[];
  };
  images_amount: number;
  video?: string;
}

export interface CarsResponse {
  data: Car[];
  meta: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}