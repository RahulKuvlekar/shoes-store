export const getDiscountedPrice = (price, percentage) =>
  ((price * (100 - percentage)) / 100).toFixed(2);
