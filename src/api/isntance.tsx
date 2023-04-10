import axios from "axios";

const token: any = localStorage.getItem('token');

export const instance = axios.create({
    baseURL: "http://localhost:28020/api/",
    headers: {
        "Content-Type": "application/json",
        'Authorization': "Bearer " + token
    }
})