export interface LoginInputDTO {
   email: string,
}






















export type user = {
   id: string
   email: string
   password: string
   name: string
   nickname: string
   role: string
}

export interface UserInputDTO {
   name: string,
   nickname: string,
   email: string,
   password: string,
   //add role
   role: UserRole
}
//
export enum UserRole {
   ADMIN = "ADMIN",
   NORMAL = "NORMAL"
}


export interface EditUserInputDTO {
   name: string,
   nickname: string,
   id: string,
   token: string
}

export interface EditUserInput {
   name: string,
   nickname: string,
   id: string
}

export interface AuthenticationData {
   id: string,
   role: string
}