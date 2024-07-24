import { Component, OnInit, ViewChild } from '@angular/core';
import { FinancialProductFormComponent } from '../../components/financial-product-form/financial-product-form.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FinancialProductsService } from '../../services/financial-products.service';
import { FinancialProduct } from '../../models/financial-product.interface';
import { transformDateFormat } from '../../utils/date.util';
import { ActivatedRoute } from '@angular/router';
import { EditFinancialProduct } from '../../models/edit-financial-product.interface';

@Component({
  selector: 'app-create-financial-product-page',
  standalone: true,
  imports: [FinancialProductFormComponent, ButtonComponent],
  templateUrl: './edit-financial-product-page.component.html',
  styleUrl: './edit-financial-product-page.component.scss',
})
export class EditFinancialProductPageComponent implements OnInit {
  @ViewChild('financialProductForm')
  financialProductForm!: FinancialProductFormComponent;
  message: string = '';
  isLoading: boolean = false;
  financialProduct!: FinancialProduct;

  constructor(
    private financialProductsService: FinancialProductsService,
    private route: ActivatedRoute
  ) {}

  editProduct() {
    if (!this.financialProductForm.form.invalid) {
      this.isLoading = false;
      const controls = this.financialProductForm.form.controls;

      const editedProduct: EditFinancialProduct = {
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

      this.financialProductsService
        .update(this.financialProduct.id, editedProduct)
        .subscribe({
          next: () => (this.message = 'Registro guardado con éxito!'),
          error: () => {
            this.message = 'Ha ocurrido un error';
          },
          complete: () => {
            this.isLoading = false;
          },
        });
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params['data']) {
        this.financialProduct = JSON.parse(params['data']) as FinancialProduct;
        console.log(this.financialProduct);
      }
    });
  }
}
