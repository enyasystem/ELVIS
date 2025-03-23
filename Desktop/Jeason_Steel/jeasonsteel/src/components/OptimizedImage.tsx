import { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

const OptimizedImage = ({ src, alt, className, width, height }: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoading(false);
  }, [src]);

  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    const sizes = [320, 640, 768, 1024, 1280];
    return sizes
      .map(size => `${src}?w=${size} ${size}w`)
      .join(', ');
  };

  return (
    <div className={`relative ${isLoading ? 'image-loading' : ''}`}>
      <img
        src={imageSrc}
        srcSet={generateSrcSet()}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        width={width}
        height={height}
        loading="lazy"
        onError={() => setImageSrc('/images/fallback.jpg')}
        decoding="async"
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
};

export default OptimizedImage;
