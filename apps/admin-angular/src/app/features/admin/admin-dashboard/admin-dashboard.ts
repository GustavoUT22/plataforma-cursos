import { Component, inject, OnInit, signal } from '@angular/core';
import { DashboardService } from '../../../core/services/dashboard.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [DatePipe, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  data = signal<any>(null);
  loading = signal(true);
  errorMessage = signal('');

  private dashboardService = inject(DashboardService);

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {
    this.loading.set(true);
    this.errorMessage.set('');

    this.dashboardService.getDashboard().subscribe({
      next: (res: any) => {
        this.data.set(res.data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar dashboard:', err);
        this.loading.set(false);
        this.errorMessage.set('Error al cargar los datos del dashboard.');
      },
    });
  }
}