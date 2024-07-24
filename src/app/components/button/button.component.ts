import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonType } from '../../models/button-type.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() buttonRole: ButtonType = 'standard';
  @Input() disabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() type: 'text' | 'submit' = 'text';

  @Output() onClick = new EventEmitter();

  constructor() {}

  get classes(): string {
    const baseClass = 'button';

    return `${baseClass} button-${this.buttonRole}`;
  }
}
