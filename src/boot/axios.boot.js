import axios from "axios";

const api = axios.create({
  baseURL: "https://pills-api-final.herokuapp.com/api/",
  withCredentials: true,
});

api.interceptors.response.use(
  () => {},
  (error) => {
    if (error) {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        // Enviar o usuário para a tela de login
      }
    }
  },
);

export default (_) => {};

export {
  axios,
  api,
};