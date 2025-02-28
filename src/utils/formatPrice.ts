export const formatPrice = (price: string | number): string => {
  if (price === "") return "0";
  let numericPrice = typeof price === "string" ? parseInt(price, 10) : price;
  if (isNaN(numericPrice)) return "0";
  return numericPrice.toLocaleString("ko-KR");
};
