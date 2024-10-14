import type { AxiosInstance, AxiosPromise } from "axios";
import { ExampleData, ExampleQuery } from "./types";

export default class AnalyticsApi {
  constructor(private axiosInstance: AxiosInstance) {}

  getAnalytics(query: ExampleQuery): AxiosPromise<ExampleData> {
    return this.axiosInstance.get("/v1/example", {
      params: query,
    });
  }
}
