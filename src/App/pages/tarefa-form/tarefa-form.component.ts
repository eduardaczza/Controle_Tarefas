import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Tarefa, CATEGORIAS, PRIORIDADES } from '../../models/tarefa.model';
import { TarefaService } from '../../services/tarefa.service';

@Component({
  selector: 'app-tarefa-form',
  standalone: true,
  imports: [RouterLink, FormsModule, NgFor, NgIf],
  templateUrl: './tarefa-form.component.html',
  styleUrls: ['./tarefa-form.component.css']
})
export class TarefaFormComponent implements OnInit {
  modoEdicao = false;
  tarefaId: number | null = null;

  categorias = CATEGORIAS;
  prioridades = PRIORIDADES;

  form: Partial<Tarefa> = {
    titulo: '',
    descricao: '',
    categoria: undefined,
    prioridade: undefined
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tarefaService: TarefaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.modoEdicao = true;
      this.tarefaId = +id;
      const tarefa = this.tarefaService.getTarefaById(this.tarefaId);
      if (tarefa) {
        this.form = {
          titulo: tarefa.titulo,
          descricao: tarefa.descricao,
          categoria: tarefa.categoria,
          prioridade: tarefa.prioridade
        };
      } else {
        this.router.navigate(['/tarefas']);
      }
    }
  }

  salvar(formRef: NgForm): void {
    if (formRef.invalid) return;

    if (this.modoEdicao && this.tarefaId !== null) {
      this.tarefaService.editarTarefa(this.tarefaId, this.form as Partial<Tarefa>);
    } else {
      this.tarefaService.adicionarTarefa(this.form as Omit<Tarefa, 'id' | 'dataCriacao' | 'concluida'>);
    }

    this.router.navigate(['/tarefas']);
  }

  cancelar(): void {
    this.router.navigate(['/tarefas']);
  }
}