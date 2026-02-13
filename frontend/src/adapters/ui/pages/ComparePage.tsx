import { useEffect, useMemo, useState } from "react";
import { ApiClient } from "../../infrastructure/ApiClient";
import Table from "../components/Table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

const TARGET = 89.3368;

export default function ComparePage() {
  const [data, setData] = useState<any[]>([]);
  const api = new ApiClient();

  useEffect(() => {
    api.getComparison().then(setData);
  }, []);

  const baseline = data.find(d => d.isBaseline);

  const enriched = useMemo(() => {
    if (!baseline) return [];

    return data.map(r => {
      const percentDiff =
        ((r.ghgIntensity / baseline.ghgIntensity) - 1) * 100;

      return {
        ...r,
        percentDiff: Number(percentDiff.toFixed(2)),
        compliant: r.ghgIntensity <= TARGET
      };
    });
  }, [data, baseline]);

  return (
    <div className="glass-card p-6 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-white">
        GHG Intensity Comparison
      </h2>

      {/* CHART */}
      <div className="mb-8 h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="routeId" />
            <YAxis />
            <Tooltip />
            <ReferenceLine
              y={TARGET}
              stroke="#22c55e"
              strokeDasharray="4 4"
              label="Target"
            />
            <Bar
              dataKey="ghgIntensity"
              radius={[8, 8, 0, 0]}
              fill="#3b82f6"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* TABLE */}
      <div className="mt-8 bg-white rounded-2xl shadow overflow-hidden">
  <table className="min-w-full">
    <thead className="bg-gray-100">
      <tr>
        <th className="px-4 py-3 text-left text-sm font-semibold">Route</th>
        <th className="px-4 py-3 text-left text-sm font-semibold">GHG Intensity</th>
        <th className="px-4 py-3 text-left text-sm font-semibold">% Difference</th>
        <th className="px-4 py-3 text-left text-sm font-semibold">Compliant</th>
      </tr>
    </thead>
    <tbody>
      {data.map(r => (
        <tr key={r.routeId} className="border-t">
          <td className="px-4 py-3">{r.routeId}</td>
          <td className="px-4 py-3">{r.ghgIntensity}</td>
          <td className="px-4 py-3">
            {r.percentDiff} %
          </td>
          <td className="px-4 py-3">
            {r.compliant ? (
              <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                ✅ Compliant
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-700">
                ❌ Non-Compliant
              </span>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
}
