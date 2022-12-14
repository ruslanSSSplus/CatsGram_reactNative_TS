import axios from "axios";

export const catsAPI = {
    getCats(page: number) {
        return axios.get(`https://api.thecatapi.com/v1/images/search?limit=20&page=${page}&order=Desc`).then(response => response.data)
    },
}