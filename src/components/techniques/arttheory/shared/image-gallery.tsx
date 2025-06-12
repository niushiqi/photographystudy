"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";
import { ArtImage } from "./art-images";

interface ImageGalleryProps {
  images: ArtImage[];
  columns?: 2 | 3 | 4;
}

export function ImageGallery({ images, columns = 3 }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const columnClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  };

  return (
    <>
      <div className={`grid ${columnClass} gap-4`}>
        {images.map((image, index) => (
          <div 
            key={index} 
            className="relative aspect-square overflow-hidden rounded-md cursor-pointer group"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {image.title && (
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div className="text-white">
                  <h4 className="font-bold">{image.title}</h4>
                  {image.description && <p className="text-sm opacity-80">{image.description}</p>}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <button
              className="absolute top-4 right-4 text-white p-2 z-10 rounded-full bg-black/50 hover:bg-black/70"
              onClick={closeLightbox}
            >
              <XIcon size={24} />
            </button>
            
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 z-10 rounded-full bg-black/50 hover:bg-black/70"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeftIcon size={24} />
            </button>
            
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 z-10 rounded-full bg-black/50 hover:bg-black/70"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRightIcon size={24} />
            </button>
            
            <div 
              className="relative w-full max-w-4xl h-full max-h-[80vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <Image
                  src={images[currentImageIndex].src}
                  alt={images[currentImageIndex].alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                {images[currentImageIndex].title && (
                  <h3 className="text-xl font-bold">{images[currentImageIndex].title}</h3>
                )}
                {images[currentImageIndex].description && (
                  <p className="text-sm mt-1">{images[currentImageIndex].description}</p>
                )}
                {images[currentImageIndex].credit && (
                  <p className="text-xs opacity-70 mt-1">{images[currentImageIndex].credit}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 