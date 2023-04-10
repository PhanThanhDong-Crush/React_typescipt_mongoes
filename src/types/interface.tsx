export interface IProduct {
    _id: any,
    name: string,
    image: string,
    price: number,
    desc: string
    categoryId: any
}

export interface IProductDetail {
    _id: any,
    name: string,
    image: string,
    price: number,
    desc: string,
    categoryId: {
        name: string,
        _id: any
    }
}

export interface ICategory {
    _id: any,
    name: string
}

export interface ISignIn {
    email: string,
    password: string,
}

export interface ISignUp extends ISignIn {
    name: string,
    email: string,
    image: string,
    confirmPassword: string
}

export interface IComment {
    _id: any,
    content: string,
    times: string,
    productId: any,
    userId: any
}