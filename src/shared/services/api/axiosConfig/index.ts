import axios from "axios";

import { errorInterceptor, responseInterceptor } from "./interceptors";

const API = axios.create({
    baseURL: "http://localhost:3333"
});

API.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
);

export { API };