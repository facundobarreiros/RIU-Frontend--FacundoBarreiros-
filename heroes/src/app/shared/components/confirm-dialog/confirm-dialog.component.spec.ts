import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent, ConfirmationDialogData } from './confirm-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;

  const testData: ConfirmationDialogData = {
    message: '¿Estás seguro de que deseas continuar?'
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MatButtonModule, ConfirmDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: spy },
        { provide: MAT_DIALOG_DATA, useValue: testData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería asignar los valores por defecto a title, confirmLabel y cancelLabel cuando no se proporcionan', () => {
    expect(component.data.title).toBe('Confirmación');
    expect(component.data.confirmLabel).toBe('Confirmar');
    expect(component.data.cancelLabel).toBe('Cancelar');
  });

  it('debería llamar a onConfirm y cerrar el diálogo con true', () => {
    component.onConfirm();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('debería llamar a onCancel y cerrar el diálogo con false', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });


});
