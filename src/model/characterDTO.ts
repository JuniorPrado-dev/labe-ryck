export interface CharacterCreateInputDTO {
   name: string;
   species: string;
   token: string;
   image:string;
}   
export interface CharacterOutputDTO {
   id:string;
   name: string;
   species: string;
   image:string;
}   

export interface CharacterDTO {
   id: string;
   name: string;
   species: string;
   image:string;
   id_user:string;
}

export interface AuthenticationData {
   email: string;
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
