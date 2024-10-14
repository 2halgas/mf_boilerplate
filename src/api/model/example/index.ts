import type { AxiosInstance, AxiosPromise } from "axios";
import { ExampleData, ExampleQuery } from "./types";

export default class ExampleApi {
  // eslint-disable-next-line no-unused-vars
  constructor(private axiosInstance: AxiosInstance) {}

  getAnalytics(query: ExampleQuery): AxiosPromise<ExampleData> {
    return this.axiosInstance.get("/v1/example", {
      params: query,
    });
  }
}
