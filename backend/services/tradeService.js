const { Trade } = require("../models/Trade.js");

async function createTrade(tradeBody) {
  console.log(tradeBody);
  try {
    tradeBody.setupCheckList = tradeBody.checkedItems;
    const newTrade = new Trade(tradeBody);
    console.log(tradeBody);
    const result = await newTrade.save();
    return result;
  } catch (error) {
    console.error("Error creating Trade: ", error.message);
    throw error;
  }
}

async function getTrade() {
  try {
    const trades = await Trade.find();
    return trades;
  } catch (error) {
    console.error("Error getting Trade: ", error.message);
    throw error;
  }
}
module.exports = {
  createTrade,
  getTrade,
};
