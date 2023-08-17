
export interface ICreateUser {
    adminId?: number,
    adminEmail?: string,

    email: string,
    fio: string,
    password: string,
    phone?: number,
    role?: string,
    maxSpace?: number,
}

export interface ILoginUser {
    email: string,
    password: string,
}

export interface ISetRole {
    userId: number,
    role: string,
    adminId: number,
    adminEmail: string
}
