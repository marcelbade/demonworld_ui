import { useContext } from "react";

const UseListSetter = () => {
  const SEC = useContext(SelectionContext);

  setSelectedUnitList = (list) => {
    SEC.setSelectedUnits(list);
    setShowUpdateListBttn(true);
  };
};

export default UseListSetter;
