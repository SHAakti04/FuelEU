import type { Route } from "../domain/Route";

export interface ApiPort {
  getRoutes(): Promise<Route[]>;
  getComparison(): Promise<any[]>;
   setBaseline(routeId: string): Promise<void>;
}
