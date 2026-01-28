const MAX_WIDTH = 270;
const MAX_HEIGHT = 340;

const MIN_WIDTH = 200;
const MIN_HEIGHT = 200;

export const calculateDimensions = (width: number, height: number) => {
  if (!width || !height) {
    return { width: MAX_WIDTH, height: MAX_WIDTH };
  }

  const aspectRatio = width / height;

  let finalWidth = MAX_WIDTH;
  let finalHeight = MAX_WIDTH / aspectRatio;

  if (finalHeight > MAX_HEIGHT) {
    finalHeight = MAX_HEIGHT;
    finalWidth = MAX_HEIGHT * aspectRatio;
  }

  if (finalHeight < MIN_HEIGHT) {
    finalHeight = MIN_HEIGHT;
    finalWidth = MIN_HEIGHT * aspectRatio;
  }

  if (finalWidth < MIN_WIDTH) {
    finalWidth = MIN_WIDTH;
    finalHeight = MIN_WIDTH / aspectRatio;
  }

  return {
    width: Math.round(finalWidth),
    height: Math.round(finalHeight),
  };
};
