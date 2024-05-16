import React from 'react'

const TextField = ({type, name, value, placeholder, updateValue, color="black"}) => {
  const styles = {
    color: color,
  }

  return (
    <div>
      <input
       type={type}
       name={name}
       value={value}
       style={styles}
       placeholder={placeholder}
       onChange={(event) => updateValue(event.target.value)}
       className="w-[80%] m-1 p-2 border border-2 border-gray-300 rounded-lg font-semibold"
      />

    </div>
  )
}

export default TextField