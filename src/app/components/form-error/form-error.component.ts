import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.scss',
})
export class FormErrorComponent {
  @Input() control?: AbstractControl;

  public errors: Record<string, any> = {
    required: 'Este campo es requerido',
    minlength: 'Demasiado corto',
    maxlength: 'Demasiado largo',
    dateInPast: 'La fecha tiene que ser más reciente',
    invalidDate: 'Formato de fecha incorrecto',
    idExists: 'ID no válido!',
    asyncError: 'Error al procesar la petición',
  };

  getErrors() {
    if (!this.control) {
      console.error('Control not provided');
    }

    if (this.control?.errors) {
      return Object.keys(this.control?.errors);
    }

    return null;
  }
}
