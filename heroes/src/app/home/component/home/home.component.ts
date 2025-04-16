import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SuperHeroService } from '../../api-heroes.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { SuperHero } from '../../../in-memory-data.service';
import { HeroeComponent } from '../heroe/heroe.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FilterGroupComponent } from '../filter-group/filter-group.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from '../../../core/interceptors/loading.interceptor';
import { LoadingService } from '../../../core/services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    HeroeComponent,
    MatPaginatorModule,
    FilterGroupComponent,
    MatDialogModule,
    MatDividerModule,
    MatProgressBarModule,
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  superheroeService = inject(SuperHeroService);
  listSuperHeroes = signal<SuperHero[] | null>(null);
  loadingService = inject(LoadingService);
  readonly dialog = inject(MatDialog);

  pageIndex = signal(0);
  pageSize = signal(5);

  totalHeroes = computed(() => this.listSuperHeroes()?.length ?? 0);

  paginatedHeroes = computed(() => {
    const heroes = this.listSuperHeroes() ?? [];
    const start = this.pageIndex() * this.pageSize();
    return heroes.slice(start, start + this.pageSize());
  });

  constructor() {  }

  ngOnInit(): void {

    this.superheroeService.getAllSuperHeroes().subscribe({
      next: (data) => {
        this.listSuperHeroes.set(data);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex);
  }

  deleteHero(idHero: number) {
    this.openDialog(idHero);
  }

  setFilters(filter: any) {
    if (filter) {
      this.superheroeService.getAllSuperHeroes().subscribe((response) => {
        this.listSuperHeroes.set(response.filter((hero: SuperHero) => hero.name.toLowerCase().includes(filter.name.toLowerCase())));
      });
    } else {
      this.superheroeService.getAllSuperHeroes().subscribe((response) => {
        this.listSuperHeroes.set(response);
      });
    }
  }

  openDialog(idHero: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: "¿Estás seguro de eliminar el héroe?", },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.superheroeService.deleteSuperHero(idHero).subscribe({
          next: () => {
            this.superheroeService.getAllSuperHeroes().subscribe((response) => {
              this.listSuperHeroes.set(response);
            });
          }
        });
    });
  }

}
