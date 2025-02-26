import { ReactNode } from "react";
import IconFood from "../assets/categoryIcons/IconFood";
import IconHome from "../assets/categoryIcons/IconHome";
import IconTraffic from "../assets/categoryIcons/IconTraffic";
import IconCom from "../assets/categoryIcons/IconCom";
import IconHealth from "../assets/categoryIcons/IconHealth";
import IconShopping from "../assets/categoryIcons/IconShopping";
import IconEducation from "../assets/categoryIcons/IconEducation";
import IconHobby from "../assets/categoryIcons/IconHobby";
import IconSaving from "../assets/categoryIcons/IconSaving";
import IconEvent from "../assets/categoryIcons/IconEvent";
import IconEtc from "../assets/categoryIcons/IconEtc";

export type CategoryProps = {
  text: string;
  borderColor?: string;
  bgColor?: string;
  icon?: ReactNode;
};

export interface IconProps {
  color?: "white";
  size?: number; // 아이콘 크기 조정
}

export const categoryList: CategoryProps[] = [
  {
    text: "식비",
    borderColor: "border-marker-food",
    bgColor: "bg-marker-food-light",
    icon: <IconFood />,
  },
  {
    text: "주거",
    borderColor: "border-marker-home",
    bgColor: "bg-marker-home-light",
    icon: <IconHome />,
  },
  {
    text: "교통",
    borderColor: "border-marker-traffic",
    bgColor: "bg-marker-traffic-light",
    icon: <IconTraffic />,
  },
  {
    text: "통신",
    borderColor: "border-marker-com",
    bgColor: "bg-marker-com-light",
    icon: <IconCom />,
  },
  {
    text: "건강",
    borderColor: "border-marker-health",
    bgColor: "bg-marker-health-light",
    icon: <IconHealth />,
  },
  {
    text: "쇼핑",
    borderColor: "border-marker-shopping",
    bgColor: "bg-marker-shopping-light",
    icon: <IconShopping />,
  },
  {
    text: "교육",
    borderColor: "border-marker-education",
    bgColor: "bg-marker-education-light",
    icon: <IconEducation />,
  },
  {
    text: "문화생활",
    borderColor: "border-marker-hobby",
    bgColor: "bg-marker-hobby-light",
    icon: <IconHobby />,
  },
  {
    text: "저축",
    borderColor: "border-marker-saving",
    bgColor: "bg-marker-saving-light",
    icon: <IconSaving />,
  },
  {
    text: "경조사",
    borderColor: "border-marker-event",
    bgColor: "bg-marker-event-light",
    icon: <IconEvent />,
  },
  {
    text: "기타",
    borderColor: "border-marker-etc",
    bgColor: "bg-marker-etc-light",
    icon: <IconEtc />,
  },
];
