import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FinancialProductsPageComponent } from './pages/financial-products-page/financial-products-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FinancialProductsPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'devsu-challenge-ui';
}
