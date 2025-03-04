import { Outlet, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import BudgetManage from "./pages/BudgetManage";
import MainLayout from "./layouts/MainLayout";
import AddPayPage from "./pages/AddPayPage";
import BudgetManageSet from "./pages/BudgetManageSet";
import PayRecodePage from "./pages/PayRecodePage";
import LoginPage from "./pages/LoginPage";
import HeaderLayout from "./layouts/HeaderLayout";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import SearchPlacePage from "./pages/SearchPlacePage";
import SearchLocation from "./pages/SearchLocation";
import StatisticPage from "./pages/StatisticPage";
import PayDetailPage from "./pages/PayDetailPage";
import MapPinPage from "./pages/MapPinPage";
import { SearchPlaceProvider } from "./contexts/SearchPlaceContext";
import PageUrls from "./constants/PageUrls";
import NavBarLayout from "./layouts/NavBarLayout";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path={PageUrls.LOGIN} element={<LoginPage />} />
      <Route path={PageUrls.SEARCH_LOCATION} element={<SearchLocation />} />
      {/* Header + Navbar */}
      <Route element={<MainLayout />}>
        <Route path={PageUrls.BUDGET} element={<BudgetManage />} />
        <Route path={PageUrls.BUDGET_SET} element={<BudgetManageSet />} />
        <Route path={PageUrls.PAY_RECODE} element={<PayRecodePage />} />
        <Route path={PageUrls.MY_PAGE} element={<MyPage />} />
        <Route path={PageUrls.STATISTIC} element={<StatisticPage />} />
        <Route path={PageUrls.PAY_DETAIL} element={<PayDetailPage />} />

        {/* SearchPlaceProvider를 감싸서 컨텍스트 유지 */}
        <Route
          element={
            <SearchPlaceProvider>
              <Outlet />
            </SearchPlaceProvider>
          }
        >
          <Route path={PageUrls.ADD_PAY} element={<AddPayPage />} />
          <Route
            path={PageUrls.ADD_PAY_SEARCH_PLACE}
            element={<SearchPlacePage />}
          />
          <Route
            path={PageUrls.ADD_PAY_SEARCH_PLACE_MAP}
            element={<MapPinPage />}
          />
        </Route>
      </Route>
      {/* Header */}
      <Route element={<HeaderLayout />}>
        <Route path={PageUrls.SIGNUP} element={<SignupPage />} />
      </Route>
      {/* Navbar */}
      <Route element={<NavBarLayout />}>
        <Route path={PageUrls.HOME} element={<MainPage />} />
      </Route>
    </Routes>
  );
};
export default App;
