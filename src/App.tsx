import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import BudgetManage from "./pages/BudgetManage";
import AddExpenditurePage from "./pages/AddExpenditurePage";
import BudgetManageSet from "./pages/BudgetManageSet";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/budget" element={<BudgetManage />} />
      <Route path="/addExpenditure" element={<AddExpenditurePage />} />
      <Route path="/budgetset" element={<BudgetManageSet />} />
    </Routes>
  );
};
export default App;
