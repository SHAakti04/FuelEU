
import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

type PoolMember = {
  shipId: string;
  cbBefore: number;
  cbAfter?: number;
};

export default function PoolingPage() {
  const [members, setMembers] = useState<PoolMember[]>([]);
  const [year, setYear] = useState(2025);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  function addMember() {
    setMembers([...members, { shipId: "", cbBefore: 0 }]);
  }

  function updateMember(index: number, key: keyof PoolMember, value: any) {
    const updated = [...members];
    updated[index][key] = value;
    setMembers(updated);
  }

  async function createPool() {
    setError(null);
    try {
      const res = await axios.post(`${API}/pools`, { year, members });
      setResult(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Pooling failed");
    }
  }

  const totalCB =
    result?.members?.reduce(
      (sum: number, m: any) => sum + m.cbAfter,
      0
    ) ?? 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6">Pooling</h2>

      {/* INPUT GRID */}
      <div className="space-y-3">
        {members.map((m, i) => (
          <div
            key={i}
            className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg"
          >
            <input
              placeholder="Ship ID"
              className="border p-2 rounded"
              value={m.shipId}
              onChange={e => updateMember(i, "shipId", e.target.value)}
            />
            <input
              type="number"
              placeholder="CB Before"
              className="border p-2 rounded"
              value={m.cbBefore}
              onChange={e =>
                updateMember(i, "cbBefore", Number(e.target.value))
              }
            />
          </div>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={addMember}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          + Add Member
        </button>

        <button
          onClick={createPool}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Create Pool
        </button>
      </div>

      {/* ERROR */}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      {/* RESULT */}
      {result && (
        <div className="mt-8 animate-slide-up">
          {/* POOL KPI */}
          <div
            className={`p-4 rounded-lg mb-6 text-center font-semibold text-lg ${
              totalCB >= 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            Pool Total CB: {totalCB} gCO₂eq
          </div>

          {/* BEFORE / AFTER TABLE */}
          <table className="w-full border rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Ship</th>
                <th className="p-2 text-right">CB Before</th>
                <th className="p-2 text-right">CB After</th>
              </tr>
            </thead>
            <tbody>
              {result.members.map((m: any) => (
                <tr
                  key={m.shipId}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-2">{m.shipId}</td>
                  <td className="p-2 text-right">{m.cbBefore}</td>
                  <td
                    className={`p-2 text-right font-semibold ${
                      m.cbAfter >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {m.cbAfter}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
