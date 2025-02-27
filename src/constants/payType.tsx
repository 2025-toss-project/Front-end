import { ReactNode } from "react";
import IconAllInType from "../assets/payTypeIcons/IconAllInType";
import IconDuruduruType from "../assets/payTypeIcons/IconDuruduruType";
import IconMemoryType from "../assets/payTypeIcons/IconMemoryType";
import IconSavingType from "../assets/payTypeIcons/IconSavingType";
import IconLoveType from "../assets/payTypeIcons/IconLoveType";
import IconHomeType from "../assets/payTypeIcons/IconHomeType";
import IconFutureType from "../assets/payTypeIcons/IconFutureType";
import IconSelfDevelopType from "../assets/payTypeIcons/IconSelfDevelopType";
import IconNoPayType from "../assets/payTypeIcons/IconNoPayType";
import IconEmotionalType from "../assets/payTypeIcons/IconEmotionalType";

export interface PayTypeProps {
  type: string;
  discription: string;
  icon: (props: { size?: number }) => ReactNode;
}

export const payTypeList: PayTypeProps[] = [
  {
    type: "올인형",
    discription: "한 가지 카테고리에 돈을 소비",
    icon: (props: { size?: number }) => <IconAllInType {...props} />,
  },
  {
    type: "두루두루형",
    discription: "여러 카테고리에 골고루 소비",
    icon: (props: { size?: number }) => <IconDuruduruType {...props} />,
  },
  {
    type: "추억수집형",
    discription: "여행, 공연, 여가 등에 소비",
    icon: (props: { size?: number }) => <IconMemoryType {...props} />,
  },
  {
    type: "절약형",
    discription: "계획적으로 소비",
    icon: (props: { size?: number }) => <IconSavingType {...props} />,
  },
  {
    type: "사랑형",
    discription: "가족, 연인, 반려동물에게 소비",
    icon: (props: { size?: number }) => <IconLoveType {...props} />,
  },
  {
    type: "집콕형",
    discription: "OTT, 배달, 온라인쇼핑에 소비",
    icon: (props: { size?: number }) => <IconHomeType {...props} />,
  },
  {
    type: "미래부자형",
    discription: "투자, 저축 등에 소비",
    icon: (props: { size?: number }) => <IconFutureType {...props} />,
  },
  {
    type: "자기계발형",
    discription: "학원, 도서 등에 소비",
    icon: (props: { size?: number }) => <IconSelfDevelopType {...props} />,
  },
  {
    type: "무소비형",
    discription: "소비가 거의 없는",
    icon: (props: { size?: number }) => <IconNoPayType {...props} />,
  },
  {
    type: "감성형",
    discription: "기분에 따라 소비",
    icon: (props: { size?: number }) => <IconEmotionalType {...props} />,
  },
];
