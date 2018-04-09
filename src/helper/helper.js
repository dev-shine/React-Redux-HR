export const qualityValue = file => {
  let quality;
  if (file.size < 5000000 && file.size >= 4000000) {
    return (quality = 0.1);
  } else if (file.size < 4000000 && file.size >= 3500000) {
    return (quality = 0.3);
  } else if (file.size < 3500000 && file.size >= 3000000) {
    return (quality = 0.4);
  } else if (file.size < 3000000) {
    return (quality = 0.6);
  }
};
