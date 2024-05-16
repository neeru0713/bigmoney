const mongoose = require("mongoose");

// Define options
const indexOptions = [
  { value: "N", label: "Nifty 50" },
  { value: "NB", label: "Nifty Bank" },
  { value: "FN", label: "Fin Nifty" },
  { value: "MN", label: "Midcap Nifty" },
  { value: "S", label: "Sensex" },
];

const pnlOptions = [
  { value: "P", label: "Profit" },
  { value: "L", label: "Loss" },
];

const mistakeTypeValuesOptions = [
  { value: "BP", label: "Bad Psychology" },
  { value: "F", label: "FOMO" },
  { value: "RCE", label: "Running Candle Entry" },
  { value: "V", label: "Volatility" },
  { value: "UM", label: "Unpredictable Market" },
  { value: "S", label: "Sideways" },
  { value: "G", label: "Greed" },
  { value: "OE", label: "Over Expectation" },
  { value: "LC", label: "Low Confidence" },
];

// Define user schema
const userSchema = mongoose.Schema(
  {
    index: {
      type: String,
      enum: indexOptions.map(option => option.value),
    },
    pnl: {
      type: String,
      enum: pnlOptions.map(option => option.value),
    },
    mistakeType: {
      type: String,
      enum: mistakeTypeValuesOptions.map(option => option.value),
    },
  },
  { timestamps: true }
);

/**
 * @typedef User
 */
const User = mongoose.model("User", userSchema);

module.exports = { User };
