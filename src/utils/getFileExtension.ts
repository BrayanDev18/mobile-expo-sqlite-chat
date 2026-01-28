export const getFileExtension = (uri: string): string | null => {
  const parts = uri.split('.');

  return parts.length > 1 ? parts.pop()!.toLowerCase() : null;
};
