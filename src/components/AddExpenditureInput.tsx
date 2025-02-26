import React from "react";

const AddExpenditureInput = () => {
  return (
    <div>
      <form className="flex flex-col px-8 py-6">
        <div className="flex flex-col py-3 mb-5">
          <div className="flex gap-5">
            <label> 금액</label>
            <input type="number" placeholder="금액을 입력하세요." />
          </div>
          <hr className="w-full border-second" />
        </div>

        <div className="flex flex-col py-3 mb-5">
          <div className="flex gap-5">
            <label> 장소</label>
            <input type="number" placeholder="장소를 입력하세요." />
          </div>
          <hr className="w-full border-second" />
        </div>
        <div className="flex flex-col py-3 mb-5">
          <div className="flex gap-5">
            <label> 지출내용</label>
            <input type="number" placeholder="지출내용 입력하세요." />
          </div>
          <hr className="w-full border-second" />
        </div>
        <div className="flex flex-col py-3 mb-5">
          <div className="flex gap-5">
            <label> 날짜</label>
            <input type="number" placeholder="날짜를 입력하세요." />
          </div>
          <hr className="w-full border-second" />
        </div>
        <div className="flex flex-col py-3 mb-5">
          <div className="flex gap-5">
            <label> 카테고리</label>
            <input type="number" placeholder="미선택" />
          </div>
          <hr className="w-full border-second" />
        </div>
      </form>
    </div>
  );
};

export default AddExpenditureInput;
