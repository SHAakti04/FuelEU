const express = require("express");
const BankingRepository = require("../../outbound/postgres/BankingRepositoryPrisma");
const { BankingUseCase } = require("../../../core/application/BankingUseCase");

const router = express.Router();
const repo = new BankingRepository();
const useCase = new BankingUseCase(repo);

router.post("/bank", async (req, res) => {
  try {
    const { shipId, year, amount } = req.body;
    await useCase.bank(shipId, year, amount);
    res.json({ message: "Amount banked" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/apply", async (req, res) => {
  try {
    const { shipId, year, amount } = req.body;
    await useCase.apply(shipId, year, amount);
    res.json({ message: "Bank applied" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
export {}; 