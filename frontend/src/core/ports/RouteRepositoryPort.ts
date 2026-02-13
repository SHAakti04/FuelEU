import type { Route } from "../domain/Route";

export interface RouteRepositoryPort {
  getAllRoutes(): Promise<Route[]>;
  setBaseline(routeId: string): Promise<void>;
}
