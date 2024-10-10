import axios from "axios";


const apiRequest = axios.create({
  baseURL: "https://estateexplorer-siar.onrender.com/api",
  withCredentials: true,
});

export default apiRequest;