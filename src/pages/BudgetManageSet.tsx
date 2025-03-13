import React, {
  useState,
  useEffect,
  Component,
  ErrorInfo,
  ReactNode,
} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { categoryList } from "../constants/category";
import BarGraph from "../components/BarGraph";
import { fetchBudgetInfo, BudgetInfo } from "../apis/BudgetInfo";
import CategoryBudgetInput from "../components/CategoryBudgetInput";
import BudgetUpdate, { updateBudgetInfo } from "../apis/BudgetUpdate";
import Loading from "../components/loading";

// --- 에러 바운더리 ---
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// --- 타입 정의 ---
interface CategoryBudget {
  id?: number;
  category: string;
  budgetPrice: number;
  percentage: number;
}

// --- MonthlyBudgetSet ---
const MonthlyBudgetSet: React.FC<{
  monthBudget: number;
  setMonthBudget: (value: number) => void;
}> = ({ monthBudget, setMonthBudget }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/,/g, "");
    const num = Number(cleaned);
    setMonthBudget(cleaned === "" ? 0 : isNaN(num) ? monthBudget : num);
  };

  return (
    <div className="p-4 mb-4 bg-white rounded-2xl drop-shadow-10">
      <div className="text-lg font-bold">
        한달에 소비할 <span className="text-marker-home">예산</span>
      </div>
      <div className="text-sm">대략 한 달에 얼마를 사용할지 예상해보세요.</div>
      <div className="text-sm">예산은 언제든지 수정이 가능해요.</div>
      <div className="flex flex-col items-center pt-9">
        <div className="flex flex-row items-center text-2xl font-bold border-b-2 border-b-second text-main focus-within:border-b-main">
          <input
            maxLength={11}
            type="text"
            value={monthBudget ? monthBudget.toLocaleString() : "0"}
            onChange={handleChange}
            style={{
              width: `${(monthBudget === 0 ? 1 : monthBudget.toString().length) + 1}ch`,
            }}
            className="text-2xl font-bold text-right bg-white border-0 focus:outline-none"
          />
          <span className="ml-1 text-2xl font-bold text-main">원</span>
        </div>
        <div className="pt-3 text-sm">
          하루당{" "}
          <span className="text-sm font-bold text-[#006f6f]">
            {Math.round(monthBudget / 30).toLocaleString()}원
          </span>{" "}
          소비가 가능해요.
        </div>
      </div>
    </div>
  );
};

// --- MonthlyBudgetBar ---
const MonthlyBudgetBar: React.FC<{
  totalBudget: number;
  categoryBudgets: CategoryBudget[];
  onChangeCategoryBudget: (category: string, newPrice: number) => void;
}> = ({ totalBudget, categoryBudgets, onChangeCategoryBudget }) => {
  return (
    <>
      {categoryList.map((cat, i) => {
        const data = categoryBudgets.find((c) => c.category === cat.text);
        const budgetPrice = data?.budgetPrice ?? 0;
        const percentage = totalBudget ? (budgetPrice / totalBudget) * 100 : 0;

        return (
          <div key={i} className="flex pt-2 gap-y-3">
            <div className="w-full rounded-2xl bg-[#f8f8f8] px-2 py-2.5">
              <div className="flex items-center justify-between pb-2 mb-1">
                <div className="z-20 flex items-center space-x-2">
                  <div className="flex rounded-full bg-second-lighter">
                    {cat.icon({})}
                  </div>
                  <div className="text-sm font-medium shrink-0">{cat.text}</div>
                  <div className="text-xs font-medium">
                    {totalBudget ? Math.round(percentage) : 0}%
                  </div>
                </div>
                <div
                  className="flex justify-end border-b-2 border-transparent border-b-second focus-within:border-b-main"
                  style={{ width: "100px" }}
                >
                  <CategoryBudgetInput
                    category={cat.text}
                    budgetPrice={budgetPrice}
                    onChangeCategoryBudget={onChangeCategoryBudget}
                  />
                  <span className="text-sm font-bold">원</span>
                </div>
              </div>
              <BarGraph props={percentage} />
            </div>
          </div>
        );
      })}
    </>
  );
};

// --- BudgetManageSet ---
const BudgetManageSet: React.FC = () => {
  const navigate = useNavigate();
  const [totalId, setTotalId] = useState<number>(0);
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [categoryBudgets, setCategoryBudgets] = useState<CategoryBudget[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getBudgetData = async () => {
      try {
        // api 연동시
        const response = await fetchBudgetInfo(); // ✅ API 호출
        const data: BudgetInfo = response.result; // ✅ data.result 사용
        setLoading(true);

        setTotalId(data.totalId ?? 0);
        setTotalBudget(data.totalBudget ?? 0);
        setCategoryBudgets(
          data.budgetInfoList?.map((item) => ({
            id: item.id,
            category: item.category,
            budgetPrice: item.budgetPrice,
            percentage: item.percentage,
          })) ?? [],
        );
      } catch (error) {
        console.error("예산 데이터 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    getBudgetData();
  }, []);

  // 클릭 시 POST API 호출 후 navigate("/budget")로 전환하는 함수 추가
  const saveAndPost = async () => {
    try {
      const payroad = {
        budgetUpdateDTOList: [
          { budgetId: totalId, price: totalBudget },
          ...categoryBudgets.map((item) => ({
            budgetId: item.id ?? 0,
            price: item.budgetPrice ?? 0,
          })),
        ],
      };
      await updateBudgetInfo(payroad);
      navigate("/budget");
    } catch (error) {
      console.error("API 데이터 전송 실패:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  const handleCategoryBudgetChange = (category: string, newPrice: number) => {
    setCategoryBudgets((prev) =>
      prev.map((item) => {
        if (item.category === category) {
          const newPerc = totalBudget ? (newPrice / totalBudget) * 100 : 0;
          return { ...item, budgetPrice: newPrice, percentage: newPerc };
        }
        return item;
      }),
    );
  };

  const used = categoryBudgets.reduce((sum, c) => sum + c.budgetPrice, 0);
  const remain = totalBudget - used;
  const isOverBudget = remain < 0;
  const isBudgetDepleted = remain == 0;

  return (
    <div className="flex flex-col w-full h-full bg-second-bg">
      <div className="flex h-full flex-col bg-[#f8f8f8] py-5">
        <MonthlyBudgetSet
          monthBudget={totalBudget}
          setMonthBudget={setTotalBudget}
        />
        <div className="p-4 mt-4 text-lg bg-white rounded-2xl drop-shadow-10">
          <div className="font-bold">
            카테고리별 소비{" "}
            <span className="font-bold text-marker-home">예산</span>
          </div>
          <div className="flex text-sm">카테고리별 예산으로 더욱 정확하게,</div>
          <div className="flex text-sm">
            원하는 카테고리 예산을 설정할 수 있어요.
          </div>
          <div className="flex flex-col items-end">
            <div className="flex flex-col items-end pb-2.5 pt-2.5 text-base">
              남은예산
              <div
                className={`font-bold text-marker-home ${isOverBudget ? "text-main" : isBudgetDepleted ? "text-black" : ""}`}
              >
                {isOverBudget
                  ? `${Math.abs(remain).toLocaleString()}원 초과`
                  : isBudgetDepleted
                    ? "소진"
                    : `${remain.toLocaleString()}원 남음`}
              </div>
            </div>
          </div>
          <MonthlyBudgetBar
            totalBudget={totalBudget}
            categoryBudgets={categoryBudgets}
            onChangeCategoryBudget={handleCategoryBudgetChange}
          />
        </div>
      </div>
      <div onClick={saveAndPost} className="cursor-pointer">
        <BudgetUpdate
          totalId={totalId}
          totalBudget={totalBudget}
          categoryBudgets={categoryBudgets}
        />
      </div>
    </div>
  );
};

// --- App 컴포넌트 (라우터 중첩 제거) ---
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<BudgetManageSet />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
