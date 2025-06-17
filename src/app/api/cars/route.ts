// src/app/api/cars/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // Формируем URL для внешнего API
  const apiUrl = new URL('https://testing-api.ru-rating.ru/cars');
  
  // Копируем все параметры запроса
  searchParams.forEach((value, key) => {
    apiUrl.searchParams.append(key, value);
  });
  
  try {
    const response = await fetch(apiUrl.toString());
    
    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }
    
    const data = await response.json();

    
    return NextResponse.json({
  data: data.data,
  meta: {
    currentPage: data.meta.page,
    totalPages: data.meta.last_page,
    totalItems: data.meta.total,
    itemsPerPage: data.meta.limit
  }
});
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}