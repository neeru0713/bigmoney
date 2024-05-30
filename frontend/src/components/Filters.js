import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Selector from "./Selector";
import TextField from "./TextField";
import { setFieldName, setOperator, setValue, updateFilters } from "../store/filterSlice";

const Filters = ({ width, trades, filteredTrades, setFilteredTrades }) => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  const coloumnToElementMap = {
    IDX: {
      element: "selector",
    },
    LS: {
      element: "textField",
      type: "number",
    },
    DATE: {
      element: "textField",
      type: "date",
    },
    T: {
      element: "textField",
      type: "time",
    },
    ENT: {
      element: "textField",
      type: "number",
    },
    EXT: {
      element: "textField",
      type: "number",
    },
    PNL: {
      element: "textField",
      type: "number",
    },
    RET: {
      element: "textField",
      type: "number",
    },
    PNLT: {
      element: "selector",
    },
  };

  const indexOptions = [
    { value: "IDX", label: "Index" },
    { value: "DATE", label: "Date" },
    { value: "T", label: "Time" },
    { value: "LS", label: "Lot Size" },
    { value: "ENT", label: "Entry Price" },
    { value: "EXT", label: "Exit Price" },
    { value: "PNL", label: "Profit and Loss" },
    { value: "RET", label: "Returns" },
    { value: "PNLT", label: "Profit and Loss Type" },
  ];

  const marketIndexOptions = [
    { value: "N", label: "Nifty 50" },
    { value: "NB", label: "Nifty Bank" },
    { value: "FN", label: "Fin Nifty" },
    { value: "MN", label: "Midcap Nifty" },
    { value: "S", label: "Sensex" },
  ];

  const getOptions = () => {
    let options;
    if (filter.fieldName === "PNLT") {
      options = [
        { value: "P", label: "Profit" },
        { value: "L", label: "Loss" },
      ];
    } else if (filter.fieldName === "IDX") {
      options = [
        { value: "N", label: "Nifty 50" },
        { value: "NB", label: "Nifty Bank" },
        { value: "FN", label: "Fin Nifty" },
        { value: "MN", label: "Midcap Nifty" },
        { value: "S", label: "Sensex" },
      ];
    }
    return options;
  };

  const getOperatorOptions = () => {
    let operatorOptions;
    if (filter.fieldName === "IDX") {
      operatorOptions = [{ value: "EQ", label: "=" }];
    } else {
      operatorOptions = [
        { value: "EQ", label: "=" },
        { value: "LT", label: "<" },
        { value: "GT", label: ">" },
      ];
    }
    return operatorOptions;
  };

  let styles = {
    width: `${width}px`,
  };

  const handleApplyFilter = () => {
    let filterObj = {
      fieldName: filter.fieldName,
      operator: filter.operator,
      value: filter.value
    }
    dispatch(updateFilters(filterObj));

  }

  return (
    <div
      className="border border-gray-400 m-[2%] p-2 fixed left-10 top-[17%]"
      style={styles}
    >
      <h1 className="text-lg font-bold">Filter</h1>

      <div className="flex flex-col gap-1">
        <Selector
          name="Market Index"
          options={indexOptions}
          value={filter.fieldName}
          updateValue={(value) => dispatch(setFieldName(value))}
          width="200"
        />

        <Selector
          name="Operator"
          options={getOperatorOptions()}
          value={filter.operator}
          updateValue={(value) => dispatch(setOperator(value))}
          width="200"
        />

        {coloumnToElementMap[filter.fieldName].element === "textField" && (
          <TextField
            type={coloumnToElementMap[filter.fieldName].type}
            name={filter.fieldName}
            value={filter.value}
            updateValue={(value) => dispatch(setValue(value))}
          />
        )}
        {coloumnToElementMap[filter.fieldName].element === "selector" && (
          <Selector
            options={getOptions()}
            name={filter.fieldName}
            value={filter.value}
            updateValue={(value) => dispatch(setValue(value))}
            width="200"
          />
        )}

        <button
          onClick={handleApplyFilter}
          className="border border-gray-400 hover:bg-white hover:text-black font-bold px-8 py-2 bg-black text-white w-[200px] rounded-md ml-1"
        >
          Apply Filter
        </button>
      </div>     

      {filter.filters?.map((item)=>(
<div> {item.value} </div>
      ))}
    </div>
    
  );
};

export default Filters;
