import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFinancialProductPageComponent } from './create-financial-product-page.component';

describe('CreateFinancialProductPageComponent', () => {
  let component: CreateFinancialProductPageComponent;
  let fixture: ComponentFixture<CreateFinancialProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFinancialProductPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFinancialProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
