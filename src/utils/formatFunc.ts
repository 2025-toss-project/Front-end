// 가격에 , 넣어주기
export const formatPrice = (price: string | number): string => {
  if (price === "") return "0";
  let numericPrice = typeof price === "string" ? parseInt(price, 10) : price;
  if (isNaN(numericPrice)) return "0";
  return numericPrice.toLocaleString("ko-KR");
};

// string -> number 변환 함수
export const InputformatPrice = (value: string): number => {
  const numericValue = parseInt(value.replace(/,/g, ""), 10);
  return isNaN(numericValue) ? 0 : numericValue;
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

// Date -> YYYY-MM-D
export const formatDateToYMD = (date: Date) => {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
};

// Input용 Price 변환
export const inputFormatPriceCheck = (value: number | string) => {
  if (!value || isNaN(Number(value)) || value === 0 || value === "0") return ""; // 값이 없거나 숫자가 아닐 경우 빈 값 반환
  const numValue = Number(String(value).replace(/,/g, "")); // 쉼표 제거 후 숫자로 변환
  return numValue.toLocaleString(); // 다시 문자열로 변환하여 리턴
};

// 요일 반환 포맷
export const formatDateWithWeekday = (
  year: number,
  month: number,
  day: number,
) => {
  const date = new Date(Number(year), Number(month) - 1, Number(day)); // 월은 0부터 시작
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  return `${day}일 ${weekdays[date.getDay()]}요일`;
};
