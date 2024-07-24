import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { Subscription } from 'rxjs';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() isLoading: boolean = false;
  @Output() onConfirm = new EventEmitter<void>();

  isOpen = false;
  private modalSubscription!: Subscription;

  constructor(private modalService: ModalService) {}

  onClose() {
    this.modalService.closeModal();
  }

  ngOnInit(): void {
    this.modalSubscription = this.modalService.modalOpen$.subscribe(
      (isOpen) => {
        this.isOpen = isOpen;
      }
    );
  }

  ngOnDestroy(): void {
    this.modalSubscription.unsubscribe();
  }
}
