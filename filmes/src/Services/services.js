import axios from "axios";

const apiporta = "5063";

// apilocal vai receber o endereço da api
const apilocal=`http://localhost:${apiporta}/api/`;

const api = axios.create({
    baseURL: apilocal
});
export default api;