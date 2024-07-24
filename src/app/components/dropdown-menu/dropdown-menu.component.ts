import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [],
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
})
export class DropdownMenuComponent {
  isOpen = false;
  @Output() onEditClick = new EventEmitter();
  @Output() onDeleteClick = new EventEmitter();

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
