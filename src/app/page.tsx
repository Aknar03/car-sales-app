// src/app/page.tsx
'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import CarCard from '@/components/CarCard';
import { Car, CarsResponse } from '@/types/cars';
import Pagination from '@/components/Pagination';

export default function CarListPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [cars, setCars] = useState<Car[]>([]);
  const [meta, setMeta] = useState<{ currentPage: number, totalPages: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Получаем параметры из URL
  const page = Number(searchParams.get('_page')) || 1;
  const sort = searchParams.get('_sort');
  const order = searchParams.get('_order');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);

        // Формируем параметры запроса
        const params = new URLSearchParams();
        params.append('_limit', '12');
        params.append('_page', page.toString());

        if (sort && order) {
          params.append('_sort', sort);
          params.append('_order', order);
        }

        const res = await fetch(`/api/cars?${params.toString()}`);

        if (!res.ok) throw new Error('Ошибка загрузки данных');

        const data: CarsResponse = await res.json();

        setCars(data.data);
        setMeta({
          currentPage: data.meta.currentPage,
          totalPages: data.meta.totalPages
        });
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [page, sort, order]);

  const handleSortChange = (newOrder: 'asc' | 'desc' | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newOrder) {
      params.set('_sort', 'price');
      params.set('_order', newOrder);
    } else {
      params.delete('_sort');
      params.delete('_order');
    }
    params.set('_page', '1'); // Сбрасываем на первую страницу при изменении сортировки

    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('_page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (loading) return <div className="p-4">Загрузка...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">Каталог автомобилей</h1>

    {/* Компонент сортировки */}
    <div className="mb-6 flex flex-wrap gap-3 items-center">
      <span className="font-medium w-full sm:w-auto">Сортировка:</span>

      <button
        onClick={() => handleSortChange('asc')}
        className={`px-4 py-2 rounded whitespace-nowrap ${
          order === 'asc' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
      >
        По возрастанию цены
      </button>

      <button
        onClick={() => handleSortChange('desc')}
        className={`px-4 py-2 rounded whitespace-nowrap ${
          order === 'desc' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
      >
        По убыванию цены
      </button>

      <button
        onClick={() => handleSortChange(null)}
        className={`px-4 py-2 rounded whitespace-nowrap ${
          !sort ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
      >
        Без сортировки
      </button>
    </div>

    {/* Список автомобилей */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {cars.map((car) => (
        <CarCard key={car.unique_id} car={car} />
      ))}
    </div>

    {/* Пагинация */}
    {meta && (
      <div className="overflow-x-auto">
        <Pagination
          currentPage={meta.currentPage}
          totalPages={meta.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    )}
  </div>
);
}