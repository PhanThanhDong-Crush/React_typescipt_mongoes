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
    password: any,
}

export interface ISignUp extends ISignIn {
    name: string,
    confirmPassword: any
}