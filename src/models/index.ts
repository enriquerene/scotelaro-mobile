export interface Plano {
  nome: string;
  valor: string;
  dataVencimento: string;
  pendencias: number;
}
export interface Modalidade {
  id: number;
  nome: string;
  image: string;
}
export interface Turma {
  id: number;
  image: string;
  title: string;
  horario: string;
  dias: string;
  modalidade: Modalidade;
}
export interface Evento {
  id: number;
  title: string;
  date: string;
  time: string;
  address: string;
}