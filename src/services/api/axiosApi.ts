import axios from "axios";
const axiosApi = axios.create({
    baseURL: 'https://67ee152e4387d9117bbf4f07.mockapi.io/api/v1'
})

export default axiosApi;