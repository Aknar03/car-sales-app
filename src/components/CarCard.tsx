'use client';

import { useState } from 'react';
import { Car } from '@/types/cars';
import Modal from '@/components/Modal';
import Image from 'next/image';

export default function CarCard({ car }: { car: Car }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = car.images?.image || ['/car-placeholder.jpg'];
  const mainImage = images[0];
  const formattedPrice = new Intl.NumberFormat('ru-RU').format(car.price);
  const extrasList = car.extras ? car.extras.split(', ').slice(0, 10) : [];

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* Карточка */}
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100">
        <div
          className="relative h-48 cursor-pointer group"
          onClick={() => setIsModalOpen(true)}
        >
          <Image
            src={mainImage}
            alt={`${car.mark_id} ${car.model_name}`}
            fill
            className="object-cover transition-transform group-hover:scale-105 duration-300 rounded"
          />
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-sm px-2 py-1 rounded">
            {car.images_amount} фото
          </div>
        </div>

        <div className="p-4 space-y-2">
          <h2 className="text-lg font-semibold">
            {car.mark_id} {car.model_name} {car.generation_name}
          </h2>

          <p className="text-xl font-bold text-blue-600">
            {formattedPrice} ₽
          </p>

          <div className="grid grid-cols-2 gap-1 text-sm text-gray-600">
            <div><span className="font-medium text-gray-800">Год:</span> {car.year}</div>
            <div><span className="font-medium text-gray-800">Пробег:</span> {car.run} км</div>
            <div><span className="font-medium text-gray-800">Двигатель:</span> {car.modification_id}</div>
            <div><span className="font-medium text-gray-800">КПП:</span> {car.gearbox}</div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Подробнее
          </button>
        </div>
      </div>

      {/* Модалка */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="max-h-[90vh] overflow-y-auto p-6 sm:p-8 bg-white rounded-lg shadow-lg space-y-6">
          {/* Заголовок */}
          <div>
            <h2 className="text-2xl font-bold">
              {car.mark_id} {car.model_name} {car.generation_name}
            </h2>
            <p className="text-xl font-semibold text-blue-600 mt-1">
              {formattedPrice} ₽
            </p>
          </div>

          {/* Галерея */}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <Image
              src={images[currentImageIndex]}
              alt={`Авто ${currentImageIndex + 1}`}
              fill
              className="object-cover transition-opacity duration-300 rounded"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                  ‹
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                  ›
                </button>
              </>
            )}
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-sm px-2 py-1 rounded">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>

          {/* Характеристики и комплектация */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Характеристики</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li><strong>Год выпуска:</strong> {car.year}</li>
                <li><strong>Пробег:</strong> {car.run} км</li>
                <li><strong>Двигатель:</strong> {car.modification_id}</li>
                <li><strong>КПП:</strong> {car.gearbox}</li>
                <li><strong>Привод:</strong> {car.drive}</li>
                <li><strong>Цвет:</strong> {car.color}</li>
                <li><strong>Состояние:</strong> {car.state}</li>
                <li><strong>Владельцев:</strong> {car.owners_number}</li>
                <li><strong>ПТС:</strong> {car.pts}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Комплектация</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                {extrasList.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
                {car.extras && car.extras.split(', ').length > 10 && (
                  <li className="text-blue-500">и ещё {car.extras.split(', ').length - 10} опций…</li>
                )}
              </ul>
            </div>
          </div>

          {/* Видеообзор */}
          {car.video && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Видеообзор</h3>
              <div className="relative aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${car.video.split('v=')[1]}`}
                  className="absolute inset-0 w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Закрыть */}
          <div className="flex justify-end pt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
            >
              Закрыть
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
