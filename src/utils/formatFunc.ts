// 가격에 , 넣어주기
export const formatPrice = (price: string | number): string => {
  if (price === "") return "0";
  let numericPrice = typeof price === "string" ? parseInt(price, 10) : price;
  if (isNaN(numericPrice)) return "0";
  return numericPrice.toLocaleString("ko-KR");
};

// year-month-day 형식 (string 형)
export const formatDate = (
  year: string,
  month: string,
  day: string,
): string => {
  if (year === "" || month === "" || day === "") return "";
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

// 날짜 포맷팅 (Number 형)
export const formatDateNum = (
  year: number,
  month: number,
  day: number,
): string => {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

// Date -> YYYY-MM-DD
export const formatDateToYMD = (date: Date) => {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
};
