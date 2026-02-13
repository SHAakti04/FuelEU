const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const routeController = require("../../adapters/inbound/http/route.controller");
const complianceController = require("../../adapters/inbound/http/compliance.controller");
const bankingController = require("../../adapters/inbound/http/banking.controller");
const poolController = require("../../adapters/inbound/http/pool.controller");

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

/* ---------- ROUTES ---------- */
app.use("/routes", routeController);
app.use("/compliance", complianceController);
app.use("/banking", bankingController);
app.use("/pools", poolController);

/* ---------- HEALTH ---------- */
app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

/* ---------- ERROR HANDLER ---------- */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message
  });
});

module.exports = app;
export {}; 