import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TarefaService } from '../../services/tarefa.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats = { total: 0, concluidas: 0, pendentes: 0, alta: 0, media: 0, baixa: 0 };

  constructor(private tarefaService: TarefaService) {}

  ngOnInit(): void {
    this.stats = this.tarefaService.getEstatisticas();
  }

  get percentualConcluido(): number {
    if (this.stats.total === 0) return 0;
    return Math.round((this.stats.concluidas / this.stats.total) * 100);
  }
}