import { boot } from "quasar/wrappers";
import axios from "axios";
import axiosConfig from "src/config/axios.config";

let api;

export default boot((_) => {
  api = axios.create(axiosConfig);

  // api.interceptors.response.use(
  //   () => {},
  //   (error) => {
  //     if (error) {
  //       const originalRequest = error.config;
  
  //       if (error.response.status === 401 && !originalRequest._retry) {
  //         originalRequest._retry = true;
  //         // Enviar o usuário para a tela de login
  //       }
  //     }
  //   },
  // );
});

export {
  api,
};
