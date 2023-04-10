import { ISignIn, ISignUp } from "../types/interface";
import { instance } from "./isntance";

export const sign_up = (user: ISignUp) => {
    return instance.post("/signup", user);
}
export const sign_in = (user: ISignIn) => {
    return instance.post("/signin", user);
}