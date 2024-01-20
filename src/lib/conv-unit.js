const convert = (unit) => {
  switch (unit) {
    case 'COUNT':
      unit = '개';
      break;
    case 'G':
      unit = 'g';
      break;
    case 'ML':
      unit = 'ml';
      break;
  }
  return unit;
}

export default convert;