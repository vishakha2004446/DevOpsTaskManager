import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:30002/api",
});

export default API;