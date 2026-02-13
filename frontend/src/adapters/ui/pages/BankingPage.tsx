
import { useState } from "react";
import { ApiClient } from "../../infrastructure/ApiClient";
import KPI from "../components/KPI";

export default function BankingPage() {
  const api = new ApiClient();

  const [shipId, setShipId] = useState("");
  const [year, setYear] = useState(2025);
  const [cb, setCb] = useState<number | null>(null);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadCB() {
    setError(null);
    setLoading(true);
    try {
      const res = await api.getComplianceCB(shipId, year);
      setCb(res.cbGco2eq);
    } catch (err: any) {
      setError(
        err.response?.data?.error || "Unable to fetch compliance balance",
      );
    } finally {
      setLoading(false);
    }
  }

  const disabled = cb === null || cb <= 0;

  return (
    <section className="relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 pointer-events-none" />

      <div className="relative glass-card p-8 rounded-3xl shadow-xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Compliance Banking
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              FuelEU Maritime — Article 20
            </p>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
            LIVE DATA
          </span>
        </div>
        {/* FORM CARD */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ship ID */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Ship Identifier
              </label>
              <input
                type="text"
                placeholder="SHIP-001"
                value={shipId}
                onChange={(e) => setShipId(e.target.value)}
                className="
          w-full rounded-xl border border-gray-300
          bg-white px-4 py-3 text-sm
          shadow-sm
          focus:border-blue-500 focus:ring-4 focus:ring-blue-100
          transition
        "
              />
            </div>

            {/* Year */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Reporting Year
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(+e.target.value)}
                className="
          w-full rounded-xl border border-gray-300
          bg-white px-4 py-3 text-sm
          shadow-sm
          focus:border-blue-500 focus:ring-4 focus:ring-blue-100
          transition
        "
              />
            </div>
          </div>
        </div>

        {/* Fetch button */}
        <button
          onClick={loadCB}
          disabled={!shipId || loading}
          className={`btn-primary w-full md:w-auto ${
            loading ? "opacity-70 cursor-wait" : ""
          }`}
        >
          {loading ? "Calculating Compliance…" : "Fetch Compliance Balance"}
        </button>

        {/* Error */}
        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 text-red-700 text-sm animate-fade-in">
            {error}
          </div>
        )}

        {/* KPI Section */}
        {cb !== null && (
          <div className="mt-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <KPI label="CB Before" value={cb} />
              <KPI label="Applied" value={amount} />
              <KPI label="CB After" value={cb - amount} />
            </div>

            {/* Amount */}
            <div className="max-w-sm">
              <label className="label">Amount to Bank / Apply</label>
              <input
                type="number"
                className="input"
                value={amount}
                onChange={(e) => setAmount(+e.target.value)}
                placeholder="gCO₂eq"
              />
            </div>

            {/* Info */}
            <div className="mt-4 text-sm text-gray-500">
              Banking & application rules are enforced by the compliance engine.
            </div>

            {/* State badge */}
            <div className="mt-4">
              {disabled ? (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                  ❌ Deficit — Banking Disabled
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                  ✅ Surplus Available
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
