
// api 연동시
import { api } from "../utils/api"; // axios 인스턴스 가져오기

export interface BudgetInfoItem {
  id: number;
  category: string;
  budgetPrice: number;
  spendPrice: number;
  percentage: number;
}

export interface BudgetInfo {
  totalBudget: number;
  totalId: number;
  totalSpend: number;
  totalPercentage: number;
  budgetInfoList: BudgetInfoItem[];
}

export const fetchBudgetInfo = async (): Promise<{ result: BudgetInfo }> => {
  try {
    const response = await api.get("/budget"); // API에서 데이터 요청
    return response.data; // result 포함된 형태로 반환
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
// 여까지


//더미데이터

// export interface BudgetInfoItem {
//   id: number;
//   category: string;
//   budgetPrice: number;
//   spendPrice: number;
//   percentage: number;
// }

// export interface BudgetInfo {
//   totalBudget: number;
//   totalSpend: number;
//   totalPercentage: number;
//   budgetInfoList: BudgetInfoItem[];
// }


// export const fetchBudgetInfo = async (): Promise<BudgetInfo> => {
//   return Promise.resolve({
//     totalBudget: 1000000,
//     totalSpend: 300000,
//     totalPercentage: 30,
//     budgetInfoList: [
//       { id: 1, category: "식비", budgetPrice: null, spendPrice: 150000, percentage: 30 },
//       { id: 2, category: "주거", budgetPrice: 200000, spendPrice: 50000, percentage: 20 },
//       { id: 3, category: "교통", budgetPrice: 150000, spendPrice: 300000, percentage: 200 },
//       { id: 4, category: "통신", budgetPrice: 100000, spendPrice: 30000, percentage: 10 },
//       { id: 5, category: "건강", budgetPrice: 250000, spendPrice: 70000, percentage: 25 },
//       { id: 6, category: "쇼핑", budgetPrice: 250000, spendPrice: 70000, percentage: 25 },
//       { id: 7, category: "교육", budgetPrice: 250000, spendPrice: 70000, percentage: 25 },
//       { id: 8, category: "문화생활", budgetPrice: 250000, spendPrice: 25000, percentage: 100 },
//       { id: 9, category: "저축", budgetPrice: 250000, spendPrice: 70000, percentage: 25 },
//       { id: 10, category: "경조사", budgetPrice: 250000, spendPrice: 70000, percentage: 25 },
//      { id: 11, category: "기타", budgetPrice: 250000, spendPrice: 70000, percentage: 25 },
//     ].map(item => ({
//       ...item,
//       budgetPrice: item.budgetPrice ?? 0, // undefined일 경우 0으로 설정
//     })),
//   });
// };
// 여까지
