export const isImage = (imageUrl: string) => {
  return imageUrl.endsWith('.jpeg') ||
    imageUrl.endsWith('.png') ||
    imageUrl.endsWith('.jpg') ||
    imageUrl.endsWith('.gif');
};
