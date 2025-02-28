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
  // 테일윈드에서 사용
  borderColor?: string;
  bgColor?: string;
  icon?: ReactNode;
  // inline-style에서 사용
  border?: string;
  background?: string;
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
    border: "#AAD6FF",
    background: "#E9F1F8",
  },
  {
    text: "주거",
    borderColor: "border-marker-home",
    bgColor: "bg-marker-home-light",
    icon: <IconHome />,
    border: "#007FF2",
    background: "#CCE5FC",
  },
  {
    text: "교통",
    borderColor: "border-marker-traffic",
    bgColor: "bg-marker-traffic-light",
    icon: <IconTraffic />,
    border: "#2D67D5",
    background: "#D5E1F7",
  },
  {
    text: "통신",
    borderColor: "border-marker-com",
    bgColor: "bg-marker-com-light",
    icon: <IconCom />,
    border: "#23B169",
    background: "#D3EFE1",
  },
  {
    text: "건강",
    borderColor: "border-marker-health",
    bgColor: "bg-marker-health-light",
    icon: <IconHealth />,
    border: "#77CEBD",
    background: "#E4F5F2",
  },
  {
    text: "쇼핑",
    borderColor: "border-marker-shopping",
    bgColor: "bg-marker-shopping-light",
    icon: <IconShopping />,
    border: "#EF4452",
    background: "#FCDADC",
  },
  {
    text: "교육",
    borderColor: "border-marker-education",
    bgColor: "bg-marker-education-light",
    icon: <IconEducation />,
    border: "#FD9F2C",
    background: "#FFECD5",
  },
  {
    text: "문화생활",
    borderColor: "border-marker-hobby",
    bgColor: "bg-marker-hobby-light",
    icon: <IconHobby />,
    border: "#A064FF",
    background: "#ECE0FF",
  },
  {
    text: "저축",
    borderColor: "border-marker-saving",
    bgColor: "bg-marker-saving-light",
    icon: <IconSaving />,
    border: "#FFC522",
    background: "#FFF3D3",
  },
  {
    text: "경조사",
    borderColor: "border-marker-event",
    bgColor: "bg-marker-event-light",
    icon: <IconEvent />,
    border: "#BFBFBF",
    background: "#F2F2F2",
  },
  {
    text: "기타",
    borderColor: "border-marker-etc",
    bgColor: "bg-marker-etc-light",
    icon: <IconEtc />,
    border: "#86584A",
    background: "#E7DEDB",
  },
];
