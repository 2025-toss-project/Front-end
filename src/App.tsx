import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import BudgetManage from "./pages/BudgetManage";
import MainLayout from "./layouts/MainLayout";
import AddPayPage from "./pages/AddPayPage";
import PayRecodePage from "./pages/PayRecodePage";
import LoginPage from "./pages/LoginPage";
import HeaderLayout from "./layouts/HeaderLayout";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import SearchPlacePage from "./pages/SearchPlacePage";
import SearchLocation from "./pages/SearchLocation";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/search/location" element={<SearchLocation />} />

      <Route element={<MainLayout title="예산관리" bgColor="bg-second-bg" />}>
        <Route path="/budget" element={<BudgetManage />} />
      </Route>
      <Route element={<MainLayout title="지출 내역 추가" />}>
        <Route path="/addpay" element={<AddPayPage />} />
      </Route>
      <Route element={<MainLayout title="지출 내역 추가" />}>
        <Route path="/searchplace" element={<SearchPlacePage />} />
      </Route>
      <Route
        element={<MainLayout title="지출 내역 리스트" bgColor="bg-second-bg" />}
      >
        <Route path="/payrecode" element={<PayRecodePage />} />
      </Route>
      <Route element={<MainLayout title="마이페이지" />}>
        <Route path="/mypage" element={<MyPage />} />
      </Route>
      <Route element={<HeaderLayout />}>
        <Route path="/signup" element={<SignupPage />} />
      </Route>
    </Routes>
  );
};
export default App;
