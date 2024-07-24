import { Component, ViewChild } from '@angular/core';
import { FinancialProductFormComponent } from '../../components/financial-product-form/financial-product-form.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FinancialProductsService } from '../../services/financial-products.service';
import { FinancialProduct } from '../../models/financial-product.interface';
import { transformDateFormat } from '../../utils/date.util';

@Component({
  selector: 'app-create-financial-product-page',
  standalone: true,
  imports: [FinancialProductFormComponent, ButtonComponent],
  templateUrl: './create-financial-product-page.component.html',
  styleUrl: './create-financial-product-page.component.scss',
})
export class CreateFinancialProductPageComponent {
  @ViewChild('financialProductForm')
  financialProductForm!: FinancialProductFormComponent;
  message: string = '';
  isLoading: boolean = false;

  constructor(private financialProductsService: FinancialProductsService) {}

  createProduct() {
    if (!this.financialProductForm.form.invalid) {
      this.isLoading = false;
      const controls = this.financialProductForm.form.controls;

      const financialProduct: FinancialProduct = {
        id: controls['id'].value,
        name: controls['name'].value,
        description: controls['description'].value,
        logo: controls['logo'].value,
        date_release: new Date(
          transformDateFormat(controls['dateRelease'].value)
        ),
        date_revision: new Date(
          transformDateFormat(controls['dateRevision'].value)
        ),
      };

      this.financialProductsService.create(financialProduct).subscribe({
        next: () => (this.message = 'Registro guardado con éxito!'),
        error: () => {
          this.message = 'Ha ocurrido un error';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
