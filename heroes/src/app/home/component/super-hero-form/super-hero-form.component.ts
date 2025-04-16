import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SuperHeroService } from '../../api-heroes.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SuperHero } from '../../../in-memory-data.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UppercaseDirective } from '../../../shared/directives/uppercase.directive';
import { LoadingService } from '../../../core/services/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-super-hero-form',
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatCardModule, RouterLink, MatButtonModule, MatCardModule, UppercaseDirective, MatProgressSpinnerModule],
  templateUrl: './super-hero-form.component.html',
  styleUrl: './super-hero-form.component.css'
})


export class SuperHeroFormComponent implements OnInit {
  superheroForm!: FormGroup;
  editing: boolean = false;
  superheroService = inject(SuperHeroService);
  snackBar = inject(MatSnackBar);
  loadingService = inject(LoadingService);

  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  private initForm(): void {
    this.superheroForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      name: ['', [Validators.required, Validators.minLength(3)]],
      power: ['', Validators.required]
    });
  }

  private checkEditMode(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editing = true;
      this.loadSuperHero(+idParam);
    }
  }

  loadSuperHero(id: number): void {
    this.superheroService.getSuperHeroById(id).subscribe({
      next: (hero: SuperHero) => {
        this.superheroForm.patchValue(hero);
      },
      error: err => console.error('Error al cargar el superhéroe', err)
    });
  }

  onSubmit(): void {
    if (this.superheroForm.invalid) {
      this.markFormTouched();
      return;
    }

    this.loadingService.show();
    const heroData = this.superheroForm.getRawValue();
    const operation$ = this.editing
      ? this.superheroService.updateSuperHero(heroData)
      : this.superheroService.registerSuperHero(heroData);

    operation$.pipe(
      finalize(() => this.loadingService.hide())
    ).subscribe({
      next: () => this.handleSuccess(),
      error: () => this.handleError(this.editing
        ? 'Error editando superhéroe'
        : 'Error creando superhéroe')
    });
  }

  private markFormTouched(): void {
    Object.values(this.superheroForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  private handleSuccess(): void {
    const message = this.editing
      ? 'Superhéroe actualizado correctamente'
      : 'Superhéroe creado correctamente';

    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });

    this.navigateToList();
  }

  private handleError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['error-snackbar']
    });

    this.navigateToList();
  }

  private navigateToList(): void {
    this.router.navigate(['/']);
  }
}
