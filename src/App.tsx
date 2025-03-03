import { Route, Routes } from "react-router-dom";
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

const App: React.FC = () => {
  return (
    <Routes>
      <Route path={PageUrls.HOME} element={<MainPage />} />
      <Route path={PageUrls.LOGIN} element={<LoginPage />} />
      <Route path={PageUrls.SEARCH_LOCATION} element={<SearchLocation />} />

      <Route element={<MainLayout title="예산관리" bgColor="bg-second-bg" />}>
        <Route path={PageUrls.BUDGET} element={<BudgetManage />} />
        <Route path={PageUrls.BUDGET_SET} element={<BudgetManageSet />} />
      </Route>

      <Route
        element={
          <SearchPlaceProvider>
            <MainLayout title="지출 내역 추가" />
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
      <Route
        element={<MainLayout title="지출 내역 리스트" bgColor="bg-second-bg" />}
      >
        <Route path={PageUrls.PAY_RECODE} element={<PayRecodePage />} />
      </Route>
      <Route element={<MainLayout title="마이페이지" />}>
        <Route path={PageUrls.MY_PAGE} element={<MyPage />} />
      </Route>
      <Route element={<MainLayout title="통계" bgColor="bg-second-bg" />}>
        <Route path={PageUrls.STATISTIC} element={<StatisticPage />} />
      </Route>
      <Route element={<HeaderLayout />}>
        <Route path={PageUrls.SIGNUP} element={<SignupPage />} />
      </Route>
      <Route element={<MainLayout title="지출내역 상세" />}>
        <Route path={PageUrls.PAY_DETAIL} element={<PayDetailPage />} />
      </Route>
    </Routes>
  );
};
export default App;
