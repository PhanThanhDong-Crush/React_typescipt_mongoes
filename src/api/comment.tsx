import { IComment } from "../types/interface";
import { instance } from "./isntance";

export const apiAllComment = () => {
    return instance.get("/comment");
}
export const apiOneComment = (id: any) => {
    return instance.get("/comment/" + id);
}
export const apiAddComment = (comment: IComment) => {
    return instance.post("/comment", comment);
}
export const apiDeleteComment = (id: any) => {
    return instance.delete("/comment/" + id);
}