export const qualityValue = file => {
  let quality;
  if ( file.size >= 4000000) {
    return (quality = 0.1);
  } else if (file.size < 4000000 && file.size >= 3500000) {
    return (quality = 0.3);
  } else if (file.size < 3500000 && file.size >= 3000000) {
    return (quality = 0.4);
  } else if (file.size < 3000000) {
    return (quality = 0.6);
  }
};

export const dateFormatter = () => {
  const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const currentDateISO = new Date();
  const year = currentDateISO.getFullYear();
  const monthNumeric = currentDateISO.getMonth();
  const date = currentDateISO.getDate();
  const monthAlpha = months[monthNumeric];
  const dateObject = {
    date,
    monthNumeric,
    monthAlpha,
    months,
    fullMonths,
    year
  };
  return dateObject;
}