export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  categoria: 'Trabalho' | 'Pessoal' | 'Estudos' | 'Outros';
  prioridade: 'Alta' | 'Média' | 'Baixa';
  concluida: boolean;
  dataCriacao: Date;
  dataConclusao?: Date;
}
 
export const CATEGORIAS: Tarefa['categoria'][] = ['Trabalho', 'Pessoal', 'Estudos', 'Outros'];
export const PRIORIDADES: Tarefa['prioridade'][] = ['Alta', 'Média', 'Baixa'];