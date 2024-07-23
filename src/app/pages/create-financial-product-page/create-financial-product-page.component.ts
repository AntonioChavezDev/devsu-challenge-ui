import { Component } from '@angular/core';
import { FinancialProductFormComponent } from "../../components/financial-product-form/financial-product-form.component";

@Component({
  selector: 'app-create-financial-product-page',
  standalone: true,
  imports: [FinancialProductFormComponent],
  templateUrl: './create-financial-product-page.component.html',
  styleUrl: './create-financial-product-page.component.scss'
})
export class CreateFinancialProductPageComponent {

}
