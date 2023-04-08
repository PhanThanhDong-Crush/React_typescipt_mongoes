import axios from "axios";

export const instance = axios.create({
    baseURL: "http://localhost:28020/api/",
    headers: {
        "Content-Type": "application/json",
        'Authorization': "Bearer token"
    }
})