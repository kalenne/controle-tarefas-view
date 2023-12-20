export interface IUsuario {
    id: number,
    nome: string,
    email:string,
    senha: string,
    status?: string,
    cpf: string,
    dataNascimento: string,
    matricula?: number,
    roles?: string
}
