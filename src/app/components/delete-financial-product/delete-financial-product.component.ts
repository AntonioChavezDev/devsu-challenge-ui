import { Component, Input } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { FinancialProduct } from '../../models/financial-product.interface';
import { FinancialProductsService } from '../../services/financial-products.service';

@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './delete-financial-product.component.html',
  styleUrl: './delete-financial-product.component.scss',
})
export class DeleteFinancialProductComponent {
  message: string = '';
  isLoading: boolean = false;

  @Input() productToDelete: FinancialProduct | null = null;

  constructor(private financialProductsService: FinancialProductsService) {}

  onModalClose() {
    this.productToDelete = null;
  }

  deleteProduct() {
    if (this.productToDelete) {
      this.isLoading = true;
      this.financialProductsService.delete(this.productToDelete.id).subscribe({
        next: () => {
          this.message = 'Registro eliminado con éxito!';
          this.isLoading = false;
        },
        error: () => {
          this.message = 'Ha ocurrido un error';
          this.isLoading = false;
        },
      });
    }
  }
}
