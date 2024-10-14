import type { AxiosInstance } from "axios";
import axiosInstance from "./axios";
import ExampleApi from "./model/example";

export class CustomExampleApi {
  example = new ExampleApi(this.axiosInstance);
  // eslint-disable-next-line no-unused-vars
  constructor(private axiosInstance: AxiosInstance) {}
}

const customApi = new CustomExampleApi(axiosInstance);
export default customApi;
