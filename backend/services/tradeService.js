const { Trade } = require("../models/Trade.js");

async function createTrade(tradeBody) {
  try {
    const newTrade = new Trade(tradeBody);
    const result = await newTrade.save();
    return result;
  } catch (error) {
    console.error("Error creating Trade: ", error.message);
    throw error;
  }
}
module.exports = {
  createTrade,
};
