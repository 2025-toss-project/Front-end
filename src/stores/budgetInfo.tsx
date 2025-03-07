
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
