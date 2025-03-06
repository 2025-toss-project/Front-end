import {
  LucideChartPie,
  LucideCircleDollarSign,
  LucideHouse,
  LucideUserRound,
  LucideWallet,
} from "lucide-react";
import PageUrls from "./PageUrls";

export const NAV_ITEMS = [
  { icon: LucideWallet, label: "소비기록", navId: 0, url: PageUrls.PAY_RECODE },
  { icon: LucideChartPie, label: "통계", navId: 1, url: PageUrls.STATISTIC },
  { icon: LucideHouse, label: "홈", navId: 2, url: PageUrls.HOME },
  {
    icon: LucideCircleDollarSign,
    label: "예산관리",
    navId: 3,
    url: PageUrls.BUDGET_SET,
  },
  { icon: LucideUserRound, label: "내정보", navId: 4, url: PageUrls.MY_PAGE },
];
