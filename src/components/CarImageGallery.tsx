'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

export default function CarImageGallery({ images }: { images: string[] }) {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: 'snap',
    slides: {
      perView: 1,
    },
  });

  return (
    <div>
      <div ref={sliderRef} className="keen-slider rounded overflow-hidden">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Фото ${i + 1}`}
            className="keen-slider__slide object-cover w-full h-64 sm:h-80"
          />
        ))}
      </div>
      <p className="text-center text-sm text-gray-400 mt-2 md:hidden">Свайпайте, чтобы посмотреть фото</p>
    </div>
  );
}
