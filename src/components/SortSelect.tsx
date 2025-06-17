// src/components/SortSelect.tsx
'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function SortSelect({
  sort,
  order,
}: {
  sort?: string | null;
  order?: string | null;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    
    if (value === 'asc' || value === 'desc') {
      params.set('_sort', 'price');
      params.set('_order', value);
      params.set('_page', '1');
    } else {
      params.delete('_sort');
      params.delete('_order');
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sort" className="text-sm font-medium text-gray-700">
        Сортировка:
      </label>
      <select
        id="sort"
        value={order || ''}
        onChange={handleSortChange}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Не выбрана</option>
        <option value="asc">Цена по возрастанию</option>
        <option value="desc">Цена по убыванию</option>
      </select>
    </div>
  );
}