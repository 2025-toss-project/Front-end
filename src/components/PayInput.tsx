import React, { useDeferredValue, useEffect, useState } from "react";
import InputDefault from "./common/InputDefault";
import { useMovePage } from "../hooks/useMovePage";
import PageUrls from "../constants/PageUrls";
import { useCategoryInfo } from "../stores/categoryInfo";
import { useLocation } from "react-router-dom";
import useSpendingInfo, { ConsumptionInfo } from "../stores/spendingInfo";
import useAddPayInfo from "../stores/addpayInfo";
import {
  formatDateNum,
  formatDateToYMD,
  InputformatPrice,
  inputFormatPriceCheck,
} from "../utils/formatFunc";
import { api } from "../utils/api";

interface PayInputProps {
  toggle?: () => void;
  isOpen?: boolean;
}

const PayInput: React.FC<PayInputProps> = ({ toggle }) => {
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 관리
  const { moveToPage } = useMovePage();
  const { addpayInfo, setAddPayInfo, resetAddPayInfo } = useAddPayInfo();
  const { spendingRecords, resetSpendingData } = useSpendingInfo();
  const { selectCategory, setSelectCategory } = useCategoryInfo();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const isEditMode = Boolean(id); // 수정 모드 여부 판단

  const [itemData, setItemData] = useState<payInfo | null>(null);
  const deferredItemData = useDeferredValue(itemData); // 지연된 값 사용

  interface payInfo {
    id: number;
    category: string;
    details: string;
    locationName: string;
    lat: number;
    lng: number;
    date: string; // YYYY-MM-DD 형식
    price: number;
  }

  useEffect(() => {
    // id가 있을 때만 API 호출
    if (id) {
      const PayDetail = async () => {
        try {
          setLoading(true);
          const res = await api.get("/map/detail", {
            params: {
              id: id,
            },
          });
          console.log("detail Res", res.data);
          setItemData(res.data.result);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
          resetAddPayInfo(); // reset 지출 데이터
        }
      };
      PayDetail();
    } else {
      resetAddPayInfo();
      setSelectCategory("");
      setLoading(false); // id가 없으면 로딩 상태를 종료
    }
  }, [id]);

  useEffect(() => {
    if (id && deferredItemData) {
      // deferredItemData가 있을 때만 정보 설정
      setAddPayInfo("price", String(deferredItemData.price));
      setAddPayInfo("detail", deferredItemData.details);
      setAddPayInfo("date", deferredItemData.date);
      setAddPayInfo("locationName", deferredItemData.locationName);
      setAddPayInfo("lat", String(deferredItemData.lat));
      setAddPayInfo("lng", String(deferredItemData.lng));
      setSelectCategory(deferredItemData.category);
    }
    console.log("de", deferredItemData);
  }, [deferredItemData, id]);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      <form className="flex flex-col gap-2 pt-3">
        <InputDefault
          label="금액"
          type="price"
          value={
            itemData
              ? inputFormatPriceCheck(itemData?.price || "")
              : inputFormatPriceCheck(addpayInfo.price) || ""
          }
          placeholder="금액을 입력하세요"
          onChange={(value) =>
            setAddPayInfo("price", String(InputformatPrice(value)))
          }
        />

        <InputDefault
          label="장소"
          placeholder="장소를 입력하세요"
          value={
            isEditMode
              ? itemData?.locationName || ""
              : addpayInfo.locationName || ""
          }
          isReadOnly={true}
          onClick={() =>
            moveToPage(
              `${PageUrls.SEARCH_PLACE}?mode=${isEditMode ? "edit" : "add"}&id=${id || ""}`,
            )
          }
        />

        <InputDefault
          label="내용"
          placeholder="지출내용을 입력하세요"
          value={isEditMode ? itemData?.details || "" : addpayInfo.detail || ""}
          onChange={(value) => setAddPayInfo("detail", value)}
        />

        <InputDefault
          label="날짜"
          type="date"
          placeholder="날짜를 입력하세요"
          value={itemData ? itemData.date || "" : addpayInfo.date || ""}
          onChange={(value) => setAddPayInfo("date", value)}
        />

        <InputDefault
          label="카테고리"
          type="category"
          value={isEditMode ? itemData?.category || "" : selectCategory || ""}
          placeholder="미선택"
          isReadOnly={true}
          onClick={toggle}
        />
      </form>
    </div>
  );
};

export default PayInput;
