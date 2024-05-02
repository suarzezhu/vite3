export default {
  start: {
    VITE_APP_URL: "http://127.0.0.1:8080/",
  },
  build: {
    VITE_APP_URL: "./dist/index.html",
  },
  production: {
    VITE_ENV: "production",
    VITE_REQUEST_URL: "请求地址"
  },
  development: {
    VITE_ENV: "development",
    VITE_REQUEST_URL: "请求地址"
  },
  envType: "development"
}