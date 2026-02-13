import { RouteEntity } from "../domain/RouteEntity";

export interface RouteRepositoryPort {
  findAll(): Promise<RouteEntity[]>;
  findBaseline(year: number): Promise<RouteEntity | null>;
  setBaseline(routeId: string): Promise<void>;
    findByShipAndYear(
    shipId: string,
    year: number
  ): Promise<RouteEntity[]>;
}
