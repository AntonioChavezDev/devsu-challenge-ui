import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFinancialProductComponent } from './delete-financial-product.component';

describe('DeleteFinancialProductComponent', () => {
  let component: DeleteFinancialProductComponent;
  let fixture: ComponentFixture<DeleteFinancialProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteFinancialProductComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteFinancialProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
