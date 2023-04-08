import { IProduct } from "../types/interface";
import { instance } from "./isntance";

export const apiAllPro = () => {
    return instance.get("/products");
}
export const apiOnePro = (id: any) => {
    return instance.get("/products/" + id);
}
export const apiAddPro = (product: IProduct) => {
    return instance.post("/products", product);
}
export const apiEditPro = (product: IProduct) => {
    return instance.patch("/products/" + product._id, product);
}
export const apiDeletePro = (id: any) => {
    return instance.delete("/products/" + id);
}