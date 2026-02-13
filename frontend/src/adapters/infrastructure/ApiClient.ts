import axios from "axios";
import type { ApiPort } from "../../core/ports/ApiPort";
import type { Route } from "../../core/domain/Route";

const API = import.meta.env.VITE_API_BASE_URL;

export class ApiClient implements ApiPort {
    async getComplianceCB(
    shipId: string,
    year: number
  ) {
    const res = await axios.get(
      `${API}/compliance/cb`,
      { params: { shipId, year } }
    );
    return res.data;
  }
  async getRoutes(): Promise<Route[]> {
    const res = await axios.get(`${API}/routes`);
    return res.data;
  }
async setBaseline(routeId: string): Promise<void> {
    await axios.post(`${API}/routes/${routeId}/baseline`);
  }
  async getComparison(): Promise<any[]> {
    const res = await axios.get(`${API}/routes/comparison`);
    return res.data;
  }
  
}
