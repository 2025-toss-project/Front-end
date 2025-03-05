import React from "react";
import InputDefault from "./common/InputDefault";
import { useMovePage } from "../hooks/useMovePage";
import PageUrls from "../constants/PageUrls";
import useAddPayInfo from "../stores/addpayInfo";
import { usePlaceInfo } from "../stores/placeInfo";

interface AddPayInputProps {
  toggle?: () => void; // 선택시 함수 전달
  isOpen: boolean; // 오픈 상태 저장
  selectName: string; // 선택한 값
}

const AddPayInput: React.FC<AddPayInputProps> = ({ toggle, selectName }) => {
  const { moveToPage } = useMovePage(); // 페이지 이동 핸들러
  const { selectPlace } = usePlaceInfo();
  const { addpayInfo, setAddPayInfo } = useAddPayInfo();

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
          onChange={(value) => setAddPayInfo("locationName", value)}
          onClick={() => moveToPage(PageUrls.ADD_PAY_SEARCH_PLACE)}
        />
        <InputDefault label="내용" placeholder="지출내용을 입력하세요" />
        <InputDefault
          label="날짜"
          type="date"
          placeholder="날짜를 입력하세요"
          value={addpayInfo.date}
          onChange={(value) => setAddPayInfo("date", value)}
        />
        <InputDefault
          label="카테고리"
          value={selectName}
          placeholder="미선택"
          isReadOnly={true}
          onClick={toggle}
          onChange={(selectName) => setAddPayInfo("category", selectName)}
        />
      </form>
    </div>
  );
};

export default AddPayInput;
