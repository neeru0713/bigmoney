import React from "react";

const Selector = ({ options, name, value, updateValue }) => {
  return (
    <select
      name={name}
      id={`${name}-select`}
      value={value}
      onChange={(event) => updateValue(event.target.value)}
      className="w-[80%] m-1 p-2 border border-2 border-gray-300 rounded-lg font-semibold"
    >
      {options.map((item, index) => (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default Selector;
