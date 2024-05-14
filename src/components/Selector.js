import React from "react";

const Selector = ({ options, name, value, updateValue }) => {
  return (
    <select
      name={name}
      id={`${name}-select`}
      value={value}
      onChange={(event) => updateValue(event.target.value)}
      className="w-[80%] m-1  p-1 border border-2 rounded-lg"
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
