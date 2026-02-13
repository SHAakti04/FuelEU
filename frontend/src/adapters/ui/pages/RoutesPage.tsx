import { useEffect, useMemo, useState } from "react";
import { ApiClient } from "../../infrastructure/ApiClient";
import Table from "../components/Table";
import type { Route } from "../../../core/domain/Route";

export default function RoutesPage() {
  const api = new ApiClient();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [filters, setFilters] = useState({
    vesselType: "",
    fuelType: "",
    year: ""
  });

  useEffect(() => {
    api.getRoutes().then(setRoutes);
  }, []);

  const filtered = useMemo(() => {
    return routes.filter(r =>
      (!filters.vesselType || r.vesselType === filters.vesselType) &&
      (!filters.fuelType || r.fuelType === filters.fuelType) &&
      (!filters.year || r.year === Number(filters.year))
    );
  }, [routes, filters]);

  return (
    <div className="glass-card p-6 animate-slide-up">
      <h2 className="text-2xl font-bold mb-4">Routes</h2>

      {/* FILTERS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <select
          className="input"
          onChange={e =>
            setFilters(f => ({ ...f, vesselType: e.target.value }))
          }
        >
          <option value="">All Vessels</option>
          <option>Container</option>
          <option>Tanker</option>
          <option>BulkCarrier</option>
          <option>RoRo</option>
        </select>

        <select
          className="input"
          onChange={e =>
            setFilters(f => ({ ...f, fuelType: e.target.value }))
          }
        >
          <option value="">All Fuels</option>
          <option>HFO</option>
          <option>LNG</option>
          <option>MGO</option>
        </select>

        <input
          type="number"
          className="input"
          placeholder="Year"
          onChange={e =>
            setFilters(f => ({ ...f, year: e.target.value }))
          }
        />
      </div>

      <Table
        headers={[
          "Route",
          "Vessel",
          "Fuel",
          "Year",
          "GHG Intensity"
        ]}
        rows={filtered.map(r => [
          r.routeId,
          r.vesselType,
          r.fuelType,
          r.year,
          r.ghgIntensity
        ])}
      />
    </div>
  );
}
