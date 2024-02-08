import { RolesEnum, UsuarioStatusEnum } from "src/app/enums/controle.enum";

export interface IUsuario {
    id: number,
    nome: string,
    email:string,
    senha: string,
    status?: UsuarioStatusEnum,
    cpf: string,
    dataNascimento: string,
    matricula?: number,
    roles?: RolesEnum
}
