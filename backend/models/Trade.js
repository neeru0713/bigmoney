const mongoose = require("mongoose");

// Define options
const indexOptions = [
  { value: "N", label: "Nifty 50" },
  { value: "NB", label: "Nifty Bank" },
  { value: "FN", label: "Fin Nifty" },
  { value: "MN", label: "Midcap Nifty" },
  { value: "S", label: "Sensex" },
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
const tradeSchema = mongoose.Schema(
  {
    marketIndex: {
      type: String,
      enum: indexOptions?.map(option => option.value),
    },
    pnl: {
      type: Number,
    },
    pnlType: {
      type: String,
    },
    entryPrice: {
      type: Number,
    },
    exitPrice: {
      type: Number,
    },
    mistakeType: {
      type: String,
      enum: mistakeTypeValuesOptions?.map(option => option.value),
    },
    lotSize: {
      type: Number,
    },
    returns: {
      type: Number,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    setupCheckList: {
      type: [String],
    }

  },
  { timestamps: true }
);

/**
 * @typedef User
 */
const Trade = mongoose.model("Trade", tradeSchema);

module.exports = { Trade };
