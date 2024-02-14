import { PrioridadeEnum, TipoStatusEnum } from "src/app/enums/controle.enum"

export interface ITarefa {
    descricao: string,
    matricula: number, 
    nomeUsuario: string,
    status: TipoStatusEnum,
    codigo: string
    titulo: string,
    dataInicio: string,
    dataFinal: string,
    prioridade: string,
    autor: string

}
