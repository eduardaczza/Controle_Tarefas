import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { Tarefa, CATEGORIAS, PRIORIDADES } from '../../models/tarefa.model';
import { TarefaService } from '../../services/tarefa.service';

@Component({
  selector: 'app-tarefa-lista',
  standalone: true,
  imports: [RouterLink, FormsModule, NgFor, NgIf, NgClass],
  templateUrl: './tarefa-lista.component.html',
  styleUrls: ['./tarefa-lista.component.css']
})
export class TarefaListaComponent implements OnInit {
  tarefas: Tarefa[] = [];
  tarefasFiltradas: Tarefa[] = [];

  categorias = CATEGORIAS;
  prioridades = PRIORIDADES;

  filtroCategoria = '';
  filtroPrioridade = '';
  filtroStatus = 'todas';
  busca = '';

  constructor(private tarefaService: TarefaService) {}

  ngOnInit(): void {
    this.carregarTarefas();
  }

  carregarTarefas(): void {
    this.tarefas = this.tarefaService.getTarefas();
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    this.tarefasFiltradas = this.tarefas.filter(t => {
      const matchCategoria = !this.filtroCategoria || t.categoria === this.filtroCategoria;
      const matchPrioridade = !this.filtroPrioridade || t.prioridade === this.filtroPrioridade;
      const matchStatus =
        this.filtroStatus === 'todas' ||
        (this.filtroStatus === 'pendentes' && !t.concluida) ||
        (this.filtroStatus === 'concluidas' && t.concluida);
      const termo = this.busca.toLowerCase();
      const matchBusca = !termo || t.titulo.toLowerCase().includes(termo) || t.descricao.toLowerCase().includes(termo);
      return matchCategoria && matchPrioridade && matchStatus && matchBusca;
    });
  }

  toggleConcluida(id: number): void {
    this.tarefaService.toggleConcluida(id);
    this.carregarTarefas();
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      this.tarefaService.excluirTarefa(id);
      this.carregarTarefas();
    }
  }

  limparFiltros(): void {
    this.filtroCategoria = '';
    this.filtroPrioridade = '';
    this.filtroStatus = 'todas';
    this.busca = '';
    this.aplicarFiltros();
  }

  corPrioridade(prioridade: string): string {
    const cores: Record<string, string> = { 'Alta': 'prio-alta', 'Média': 'prio-media', 'Baixa': 'prio-baixa' };
    return cores[prioridade] || '';
  }
}