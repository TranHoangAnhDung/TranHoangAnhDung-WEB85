export const findById = (id, arr) => arr.find((item) => item.id === id);

export const findOrdersById = (id, arr) =>
  arr.filter((item) => item.customerId === id);

export const findHighValue = (orders) =>
  orders.filter((order) => order.totalPrice > 10000000);

export const rangePriceProduct = (min, max, arr) =>
  arr.filter((item) => item.price >= min && item.price <= max);
