'use client';

import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    // Всегда показываем первую страницу
    // Диапазон страниц для центральных кнопок:
    let start = Math.max(2, currentPage - 2);
    let end = Math.min(totalPages - 1, start + maxVisible - 3);

    // Если близко к концу, смещаем окно назад, чтобы показать maxVisible кнопок
    if (currentPage > totalPages - 3) {
      start = Math.max(2, totalPages - maxVisible + 2);
      end = totalPages - 1;
    }

    // Кнопка 1 всегда есть
    pages.push(1);

    // Добавляем "..." если нужно между 1 и стартом
    if (start > 2) {
      pages.push('left-ellipsis');
    }

    // Центральные номера страниц
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Добавляем "..." если нужно между концом и последней страницей
    if (end < totalPages - 1) {
      pages.push('right-ellipsis');
    }

    // Если всего страниц больше 1, показываем последнюю
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-4 mb-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Назад
        </button>

        <div className="flex items-center space-x-2">
          {generatePageNumbers().map((pageNum, idx) => {
            if (pageNum === 'left-ellipsis' || pageNum === 'right-ellipsis') {
              return (
                <span key={pageNum + idx} className="px-2 select-none">
                  ...
                </span>
              );
            }

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(Number(pageNum))}
                className={`w-10 h-10 rounded-full ${
                  currentPage === pageNum
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Вперед
        </button>
      </div>
    </div>
  );
}
