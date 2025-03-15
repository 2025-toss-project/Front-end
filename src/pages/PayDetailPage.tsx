import React, { useEffect, useState } from "react";

import SelectCategory from "../components/SelectCategory";
import { SaveButton } from "../components/common/Buttons";
import useAddPayInfo from "../stores/addpayInfo";
import { api } from "../utils/api";
import { useLocation } from "react-router-dom";
import { useMovePage } from "../hooks/useMovePage";
import PageUrls from "../constants/PageUrls";
import { LucideTrash2, LucideX } from "lucide-react";
import useSpendingInfo, { ConsumptionInfo } from "../stores/spendingInfo";
import PayInput from "../components/PayInput";
import { formatDateToYMD } from "../utils/formatFunc";
import Loading from "../components/loading";
import { useCategoryInfo } from "../stores/categoryInfo";

const PayDetailPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [itemData, setItemData] = useState<any | null>(null);
  const { addpayInfo, setAddPayInfo, resetAddPayInfo } = useAddPayInfo();
  const { moveToPage } = useMovePage(); // 페이지 이동 핸들러
  const { spendingRecords, setSpendingData } = useSpendingInfo();
  const { isOpen, setIsOpen, selectCategory, setSelectCategory } =
    useCategoryInfo();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      const fetchPayDetail = async () => {
        try {
          setLoading(true);
          const res = await api.get("/map/detail", {
            params: { id: id },
          });

          // 기존 itemData 값과 addpayInfo 값 병합
          setItemData(() => ({
            ...res.data.result,
            locationName:
              addpayInfo.locationName || res.data.result.locationName,
            lat: addpayInfo.lat || res.data.result.lat,
            lng: addpayInfo.lng || res.data.result.lng, // addpayInfo.locationName이 있으면 우선 적용
          }));
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchPayDetail();
    }
    return () => {
      resetAddPayInfo();
    };
  }, [id]);

  if (loading) return <Loading />;

  const isAddpayInfoComplete =
    Object.values(addpayInfo).every((value) => {
      if (typeof value === "object" && value !== null) {
        // 내부 객체가 있을 경우, 그 값들에 대해서 다시 검사
        return Object.values(value).every(
          (nestedValue) => nestedValue !== 0 && nestedValue !== "",
        );
      }
      // 빈 문자열도 유효하지 않게 체크
      return value !== "" && value !== 0;
    }) && selectCategory !== ""; // 카테고리 유효성 추가;

  const handleClickUpdate = async () => {
    if (!isAddpayInfoComplete) {
      return alert("모든 정보를 입력해주세요.");
    }
    try {
      const res = await api.post("/consumption/update", {
        id: id,
        price: Number(addpayInfo.price),
        details: addpayInfo.details,
        category: selectCategory,
        lat: Number(addpayInfo.lat),
        lng: Number(addpayInfo.lng),
        locationName: addpayInfo.locationName,
        date: addpayInfo.date,
      });
      setSpendingData(res.data.result);
    } catch (error) {
      console.error(error);
    } finally {
      const formattedDate = formatDateToYMD(new Date(addpayInfo.date));
      moveToPage(`${PageUrls.PAY_RECODE}?refresh=${formattedDate}`);
      //resetAddPayInfo();
      setSelectCategory("");
    }
  };

  const handleClickDelete = async () => {
    if (!id) {
      alert("삭제할 항목이 없습니다.");
      return;
    }
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    // spendingRecords에서 id에 해당하는 항목을 찾는 부분
    const deletedItem = spendingRecords.find((dayData) =>
      dayData.consumptionInfoList.some(
        (item: ConsumptionInfo) => item.id === Number(id),
      ),
    );

    try {
      const res = await api.delete(`consumption/delete?consumptionId=${id}`);
    } catch (error) {
      console.error("삭제 실패:", error);
    } finally {
      if (deletedItem) {
        // deletedItem은 ConsumptionInfoByDate 타입
        const { year, month, day } = deletedItem; // 삭제된 항목의 날짜 정보
        const deleteDate = new Date(year, month - 1, day);

        const formattedDate = formatDateToYMD(deleteDate);
        moveToPage(`${PageUrls.PAY_RECODE}?refresh=${formattedDate}`);
      } else {
        // 날짜 정보를 알 수 없는 경우 현재 날짜로 설정
        moveToPage(
          `${PageUrls.PAY_RECODE}?refresh=${formatDateToYMD(new Date())}`,
        );
      }
    }
  };

  // 카테고리 선택 처리
  const handleCategorySelect = (selectedCategory: string) => {
    setSelectCategory(selectedCategory);
    //setAddPayInfo("category", selectedCategory);
    setIsOpen(false); // 선택 후 닫기
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col px-2">
        <div
          onClick={() => moveToPage(PageUrls.PAY_RECODE)}
          className="flex justify-end"
        >
          <LucideX />
        </div>
        <PayInput
          toggle={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
          itemData={itemData}
        />
        <SelectCategory classname={isOpen ? "block" : "hidden"} />
      </div>
      <div className="flex flex-row items-center gap-3">
        <SaveButton
          style={"flex-grow"}
          title="수정하기"
          onClick={handleClickUpdate}
        />
        <div
          onClick={handleClickDelete}
          className="flex h-12 w-12 items-center justify-center rounded-md border border-gray-500"
        >
          <LucideTrash2 size={26} color="#777" />
        </div>
      </div>
    </div>
  );
};

export default PayDetailPage;
