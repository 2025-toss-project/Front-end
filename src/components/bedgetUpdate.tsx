// budgetUpdate.tsx
import React, { useState } from "react";
import { api } from "../utils/api"; // axios 인스턴스
import { SaveButton } from "../components/common/Buttons";

// API 호출 관련 타입과 함수 정의
export interface BudgetUpdateDTO {
  budgetId: number;
  price: number;
}

export interface UpdateBudgetPayroad {
  budgetUpdateDTOList: BudgetUpdateDTO[];
}

export const updateBudgetInfo = async (payroad: UpdateBudgetPayroad): Promise<any> => {
  try {
    const response = await api.post("/budget/update", payroad);
    return response.data;
  } catch (error) {
    console.error("예산 업데이트 요청 중 오류 발생:", error);
    throw error;
  }
};

// 카테고리별 예산 타입 정의
interface CategoryBudget {
  id?: number;
  category: string;
  budgetPrice: number;
  percentage: number;
}

// 컴포넌트 Props 타입 정의 (totalId 추가)
interface BudgetUpdateProps {
  totalId: number;          // 전체 예산의 ID (GET 응답의 totalId)
  totalBudget: number;      // 한달 전체 예산
  categoryBudgets: CategoryBudget[];
}

const BudgetUpdate: React.FC<BudgetUpdateProps> = ({ totalId, totalBudget, categoryBudgets }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handlePost = async () => {
    setIsLoading(true);
    setMessage(null);

    // payload 구성:
    // - 전체 예산은 totalId를 사용하여 업데이트합니다.
    const payroad: UpdateBudgetPayroad = {
      budgetUpdateDTOList: [
        { budgetId: totalId, price: totalBudget },
        ...categoryBudgets.map((item) => ({
          budgetId: item.id ?? 0,
          price: item.budgetPrice ?? 0,
        })),
      ],
    };

    try {
      await updateBudgetInfo(payroad);
      setMessage("예산 업데이트 성공!");
    } catch (error) {
      console.error("예산 업데이트 실패:", error);
      setMessage("예산 업데이트 실패. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <SaveButton title={isLoading ? "저장 중..." : "저장하기"} onClick={handlePost} />
      {message && <div className="mt-2 text-sm">{message}</div>}
    </div>
  );
};

export default BudgetUpdate;
