import axios from "axios";

import { errorInterceptor, responseInterceptor } from "./interceptors";
import { Enviroment } from "../../../environment";

const API = axios.create({
    baseURL: Enviroment.URL_BASE,
});

API.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
);

export { API };