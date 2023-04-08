import axios from "axios";
import { ICategory } from "../types/interface";
import { instance } from "./isntance";

export const apiAllCate = () => {
    return instance.get("/category");
}
export const apiOneCate = (id: any) => {
    return instance.get("/category/" + id);
}
export const apiAddCate = (category: ICategory) => {
    return instance.post("/category", category);
}
export const apiEditCate = (category: ICategory) => {
    return instance.patch("/category/" + category._id, category);
}
export const apiDeleteCate = (id: any) => {
    return instance.delete("/category/" + id);
}