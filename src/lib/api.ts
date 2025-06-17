// src/lib/api.ts
import { CarsResponse } from '@/types/cars';

export async function fetchCars({
  page = 1,
  sort,
  order,
}: {
  page?: number;
  sort?: string | null;
  order?: string | null;
}): Promise<CarsResponse> {
  const params = new URLSearchParams({
    _limit: '12',
    _page: page.toString(),
  });
  
  if (sort && order) {
    params.append('_sort', sort);
    params.append('_order', order);
  }

  const res = await fetch(`/api/cars?${params.toString()}`);
  
  if (!res.ok) {
    throw new Error(`Failed to fetch cars: ${res.status} ${res.statusText}`);
  }
  
  return res.json();
}