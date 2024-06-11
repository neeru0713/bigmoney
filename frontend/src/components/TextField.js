import React from "react";

const TextField = ({
  type,
  name,
  value,
  placeholder,
  updateValue,
  color = "black",
  date,
  id,
  checked,
  children,
  width,
  checkBoxWeight,
  checkBoxHeight
}) => {
  let styles = {
    color: color,
    width: `${width}px`,
  };

  if (type === "checkbox") {
    styles = { ...styles, height: `${checkBoxHeight}rem`, width: `${checkBoxWeight}rem`};
  }

  const inputChangeHandler = (event) => {
    if (type === "checkbox") {
      updateValue(name);
    } else if (type === "number") {
      updateValue(parseFloat(event.target.value));
    } else {
      updateValue(event.target.value);
    }
  };

  return (
    <div className="flex items-center justify-start gap-2">
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        style={styles}
        date={date}
        id={id}
        placeholder={placeholder}
        onChange={inputChangeHandler}
        className="m-1 p-2 border border-2 border-gray-300 rounded-lg font-semibold"
      />
      {children}
    </div>
  );
};

export default TextField;
