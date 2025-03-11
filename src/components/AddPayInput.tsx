import React from "react";
import InputDefault from "./common/InputDefault";
import { useMovePage } from "../hooks/useMovePage";
import { DataProps } from "../pages/MainPage";

interface AddPayInputProps {
  toggle?: () => void; // 선택시 함수 전달
  isOpen?: boolean; // 오픈 상태 저장
  selectName?: string; // 선택한 값
  defaultDatas?: DataProps | null;
}

const AddPayInput: React.FC<AddPayInputProps> = ({
  toggle,
  isOpen,
  selectName,
  defaultDatas,
}) => {
  const { moveToPage } = useMovePage(); // 페이지 이동 핸들러

  return (
    <div>
      <form className="flex flex-col gap-2 pt-3">
        <InputDefault
          label="금액"
          type="price"
          placeholder="금액을 입력하세요"
          value={defaultDatas?.price.toString()}
        />
        <InputDefault
          label="장소"
          placeholder="장소를 입력하세요"
          onClick={() => moveToPage("/addpay/searchplace")}
          value={defaultDatas?.locationName}
        />
        <InputDefault
          label="지출내용"
          placeholder="지출내용을 입력하세요"
          value={defaultDatas?.details}
        />
        <InputDefault
          label="날짜"
          type="date"
          placeholder="날짜를 입력하세요"
          value={defaultDatas?.date}
        />
        <InputDefault
          label="카테고리"
          value={defaultDatas?.category || selectName}
          placeholder="미선택"
          isReadOnly={true}
          onClick={toggle}
        />
      </form>
    </div>
  );
};

export default AddPayInput;
