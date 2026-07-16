export const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

export const mapScrollToFrame = (progress: number, totalFrames: number): number => {
  const frame = Math.floor(progress * (totalFrames - 1)) + 1;
  return clamp(frame, 1, totalFrames);
};
