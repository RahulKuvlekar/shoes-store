export const sortByPrice = (type, products) => {
  if (type?.toUpperCase() === "LOW TO HIGH") {
    return [...products].sort((a, b) => a.discountedPrice - b.discountedPrice);
  } else if (type?.toUpperCase() === "HIGH TO LOW") {
    return [...products].sort((a, b) => b.discountedPrice - a.discountedPrice);
  } else return products;
};

export const sortByPriceRange = (range, products) =>
  products.filter((product) => product.discountedPrice <= range);

export const sortByRating = (rating, products) =>
  rating ? products.filter((product) => product.rating >= rating) : products;

export const sortByCategory = (category, products) =>
  category.length > 0
    ? products.filter((product) => category.includes(product.category))
    : products;

export const sortByBrand = (brand, products) =>
  brand.length > 0
    ? products.filter((product) => brand.includes(product.brand))
    : products;

export const sortByOther = (other, products) => {
  let filteredProduct = products;
  if (other.includes("FastShipping")) {
    filteredProduct = filteredProduct.filter(
      (product) => product.fastDelivery === true
    );
  }
  if (!other.includes("OutOfStock")) {
    filteredProduct = filteredProduct.filter(
      (product) => product.inStock === true
    );
  }
  return filteredProduct;
};
