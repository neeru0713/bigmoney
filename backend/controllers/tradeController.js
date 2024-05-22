const tradeService = require("../services/tradeService");

const createTrade = async (req, res) => {
  try {
    let newTrade = await tradeService.createTrade(req.body);
    let resObj = {
      trade: newTrade,
      message: "Create trade successfully",
    };
    res.status(201).json(resObj);
  } catch (error) {
    console.error("Error during creating Trade:", error);
    res.status(500).json({ error: error.message });
  }
};

const getTrade = async (req, res) => {
  try {
    let trades = await tradeService.getTrade();
    let resObj = {
      trades,
      message: "Geeting all trade sucessfully",
    };
    res.status(201).json(resObj);
  } catch (error) {
    console.error("Error during getting all Trade:", error);
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createTrade,
  getTrade,
};
