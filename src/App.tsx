import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import BudgetManage from "./pages/BudgetManage";
import MainLayout from "./layouts/MainLayout";
import AddPayPage from "./pages/AddPayPage";
import PayRecodePage from "./pages/PayRecodePage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route element={<MainLayout title="예산관리" bgColor="bg-second-bg" />}>
        <Route path="/budget" element={<BudgetManage />} />
      </Route>
      <Route element={<MainLayout title="지출 내역 추가" />}>
        <Route path="/addpay" element={<AddPayPage />} />
      </Route>
      <Route
        element={<MainLayout title="지출 내역 리스트" bgColor="bg-second-bg" />}
      >
        <Route path="/payrecode" element={<PayRecodePage />} />
      </Route>
    </Routes>
  );
};
export default App;
