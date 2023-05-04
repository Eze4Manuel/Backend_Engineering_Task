
export interface loginTemplate {
    email: string | number,
    password: string
}



export interface adminLoginSuccessTemplate {
    user_id: string,
    first_name: string,
    last_name: string,
    email: string,
    token: string,
    phone_number: string,
}