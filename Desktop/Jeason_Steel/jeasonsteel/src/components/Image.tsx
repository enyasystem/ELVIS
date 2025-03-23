import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
}

const OptimizedImage = ({ src, alt, className }: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  // Convert image path to WebP format
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/, '.webp');

  return (
    <div className={`relative ${isLoading ? 'image-loading' : ''}`}>
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={src}
          alt={alt}
          className={className}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
        />
      </picture>
    </div>
  );
};

export default OptimizedImage;
