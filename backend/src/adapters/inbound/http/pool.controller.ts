const express = require("express");
const { PoolingUseCase } = require("../../../core/application/PoolingUseCase");

const router = express.Router();
const useCase = new PoolingUseCase();

router.post("/", async (req, res) => {
  try {
    const { year, members } = req.body;
    const pool = useCase.execute(year, members);
    res.json(pool);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
export {}; 