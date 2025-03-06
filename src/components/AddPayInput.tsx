import React, { useEffect } from "react";
import InputDefault from "./common/InputDefault";
import { useMovePage } from "../hooks/useMovePage";
import PageUrls from "../constants/PageUrls";
import useAddPayInfo from "../stores/addpayInfo";
import { usePlaceInfo } from "../stores/placeInfo";
import { useCategoryInfo } from "../stores/CategoryInfo";

interface AddPayInputProps {
  toggle?: () => void; // 선택시 함수 전달
  isOpen: boolean; // 오픈 상태 저장
}

const AddPayInput: React.FC<AddPayInputProps> = ({ toggle }) => {
  const { moveToPage } = useMovePage(); // 페이지 이동 핸들러
  const { selectPlace } = usePlaceInfo();
  const { addpayInfo, setAddPayInfo } = useAddPayInfo();
  const { selectName } = useCategoryInfo();

  return (
    <div>
      <form className="flex flex-col gap-2 pt-3">
        <InputDefault
          label="금액"
          type="price"
          value={addpayInfo.price}
          onChange={(value) => setAddPayInfo("price", value)}
          placeholder="금액을 입력하세요"
        />
        <InputDefault
          label="장소"
          placeholder="장소를 입력하세요"
          value={selectPlace}
          onClick={() => moveToPage(PageUrls.ADD_PAY_SEARCH_PLACE)}
        />
        <InputDefault
          label="내용"
          placeholder="지출내용을 입력하세요"
          onChange={(value) => setAddPayInfo("detail", value)}
        />
        <InputDefault
          label="날짜"
          type="date"
          placeholder="날짜를 입력하세요"
          value={addpayInfo.date}
          onChange={(value) => {
            if (value) {
              const formattedDate = new Date(value);
              if (!isNaN(formattedDate.getTime())) {
                const dateString = formattedDate.toISOString().split("T")[0];
                setAddPayInfo("date", dateString);
              } else {
                console.error("Invalid date value:", value);
              }
            } else {
              setAddPayInfo("date", "");
            }
          }}
        />
        <InputDefault
          label="카테고리"
          type="category"
          value={selectName}
          placeholder="미선택"
          isReadOnly={true}
          onClick={toggle}
          // key={`category-${selectName}`} // 키를 추가하여 강제 리렌더링
        />
      </form>
    </div>
  );
};

export default AddPayInput;
