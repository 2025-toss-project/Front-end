import React, { useEffect, useState } from "react";

import AddPayInput from "../components/AddPayInput";
import SelectCategory from "../components/SelectCategory";
import { SaveButton } from "../components/common/Buttons";
import { useLocation } from "react-router-dom";
import { DataProps } from "./MainPage";
import { api } from "../utils/api";

const PayDetailPage = () => {
  const location = useLocation();
  const [defaultDatas, setDefaultDatas] = useState<DataProps | null>();

  const getPayDetail = async (id: number) => {
    const res = await api.get("/map/detail", {
      params: { id },
    });
    setDefaultDatas(res.data.result);
  };

  useEffect(() => {
    if (location.state.id) {
      getPayDetail(location.state.id);
    }
  }, [location.state.id]);
  const [selectName, setSelectName] = useState(""); // 선택한 값 저장

  return (
    <div className="flex w-full flex-col">
      <AddPayInput defaultDatas={defaultDatas} />
      <SelectCategory
        selectName={selectName}
        setSelectName={() => setSelectName(selectName)}
      />
      <SaveButton title="수정하기" />
    </div>
  );
};

export default PayDetailPage;
