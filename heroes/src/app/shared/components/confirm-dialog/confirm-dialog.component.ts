import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})

export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
  ) {
    if (!this.data.title) {
      this.data.title = 'Confirmación';
    }
    if (!this.data.confirmLabel) {
      this.data.confirmLabel = 'Confirmar';
    }
    if (!this.data.cancelLabel) {
      this.data.cancelLabel = 'Cancelar';
    }
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}


export interface ConfirmationDialogData {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
}
