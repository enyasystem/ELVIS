export const useImagePreload = (imagePaths: string[]) => {
  const preloadImages = () => {
    imagePaths.forEach(path => {
      const img = new Image();
      img.src = path;
    });
  };

  return preloadImages;
};
