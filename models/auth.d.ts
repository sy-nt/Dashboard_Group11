export interface I_Login{
    username: string;
    password: string;
}

export interface I_Signup extends I_Login{
    firstName: string;
    lastName: string;
}