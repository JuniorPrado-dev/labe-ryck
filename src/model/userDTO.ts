
export interface SingUpInputDTO {
   email: string;
   name:string;
   password:string;
}

export interface UserOutputDTO {
   id: string;
   name:string;
}   
   
export interface LoginInputDTO {
   email: string;
   password:string;
}   

export interface ValidateDTO {
   id: string;
}   

export interface UserDTO {
   id: string;
   name: string;
   email: string;
   password: string;
}