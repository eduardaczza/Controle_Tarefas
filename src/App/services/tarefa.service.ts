import { Injectable } from '@angular/core';
import { Tarefa, CATEGORIAS, PRIORIDADES } from '../models/tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private tarefas: Tarefa[] = [
    {
      id: 1,
      titulo: 'Estudar Angular',
      descricao: 'Revisar material de Data Binding',
      categoria: 'Estudos',
      prioridade: 'Alta',
      concluida: false,
      dataCriacao: new Date('2024-04-20')
    },
    {
      id: 2,
      titulo: 'Fazer compras',
      descricao: 'Arroz, feijão, café',
      categoria: 'Pessoal',
      prioridade: 'Média',
      concluida: true,
      dataCriacao: new Date('2024-04-21'),
      dataConclusao: new Date('2024-04-22')
    },
    {
      id: 3,
      titulo: 'Reunião com time',
      descricao: 'Daily às 10h',
      categoria: 'Trabalho',
      prioridade: 'Alta',
      concluida: false,
      dataCriacao: new Date('2024-04-23')
    },
    {
      id: 4,
      titulo: 'Ler documentação TypeScript',
      descricao: 'Capítulos 5 e 6',
      categoria: 'Estudos',
      prioridade: 'Baixa',
      concluida: false,
      dataCriacao: new Date('2024-04-24')
    },
    {
      id: 5,
      titulo: 'Ligar para dentista',
      descricao: 'Agendar consulta',
      categoria: 'Pessoal',
      prioridade: 'Média',
      concluida: false,
      dataCriacao: new Date('2024-04-25')
    }
  ];

  private nextId = 6;

  getTarefas(): Tarefa[] {
    return [...this.tarefas];
  }

  getTarefaById(id: number): Tarefa | undefined {
    return this.tarefas.find(t => t.id === id);
  }

  adicionarTarefa(tarefa: Omit<Tarefa, 'id' | 'dataCriacao' | 'concluida'>): Tarefa {
    const nova: Tarefa = {
      ...tarefa,
      id: this.nextId++,
      concluida: false,
      dataCriacao: new Date()
    };
    this.tarefas.push(nova);
    return nova;
  }

  editarTarefa(id: number, dados: Partial<Tarefa>): Tarefa | null {
    const index = this.tarefas.findIndex(t => t.id === id);
    if (index === -1) return null;
    this.tarefas[index] = { ...this.tarefas[index], ...dados };
    return this.tarefas[index];
  }

  excluirTarefa(id: number): boolean {
    const index = this.tarefas.findIndex(t => t.id === id);
    if (index === -1) return false;
    this.tarefas.splice(index, 1);
    return true;
  }

  toggleConcluida(id: number): Tarefa | null {
    const tarefa = this.tarefas.find(t => t.id === id);
    if (!tarefa) return null;
    tarefa.concluida = !tarefa.concluida;
    tarefa.dataConclusao = tarefa.concluida ? new Date() : undefined;
    return tarefa;
  }

  getEstatisticas() {
    const total = this.tarefas.length;
    const concluidas = this.tarefas.filter(t => t.concluida).length;
    const pendentes = total - concluidas;
    const alta = this.tarefas.filter(t => t.prioridade === 'Alta').length;
    const media = this.tarefas.filter(t => t.prioridade === 'Média').length;
    const baixa = this.tarefas.filter(t => t.prioridade === 'Baixa').length;
    return { total, concluidas, pendentes, alta, media, baixa };
  }
}