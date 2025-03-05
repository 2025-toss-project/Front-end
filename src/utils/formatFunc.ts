export const formatPrice = (price: string | number): string => {
  if (price === "") return "0";
  let numericPrice = typeof price === "string" ? parseInt(price, 10) : price;
  if (isNaN(numericPrice)) return "0";
  return numericPrice.toLocaleString("ko-KR");
};

export const formatDate = (
  year: string,
  month: string,
  day: string,
): string => {
  if (year === "" || month === "" || day === "") return "";
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};
