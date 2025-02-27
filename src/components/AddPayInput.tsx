import React from "react";
import InputDefault from "./common/InputDefault";

const AddPayInput = () => {
  return (
    <div>
      <form className="flex flex-col gap-2 pt-3">
        <InputDefault
          label="금액"
          type="number"
          placeholder="금액을 입력하세요"
        />
        <InputDefault label="장소" placeholder="장소를 입력하세요" />
        <InputDefault label="지출내용" placeholder="지출내용을 입력하세요" />
        <InputDefault
          label="날짜"
          type="date"
          placeholder="날짜를 입력하세요"
        />
        <InputDefault label="카테고리" placeholder="미선택" />
      </form>
    </div>
  );
};

export default AddPayInput;
