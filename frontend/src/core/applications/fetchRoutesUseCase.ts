import { ApiPort } from "../ports/ApiPort";

export class FetchRoutesUseCase {
  constructor(private api: ApiPort) {}

  execute() {
    return this.api.getRoutes();
  }
}
