import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFinancialProductPageComponent } from './edit-financial-product-page.component';

describe('EditFinancialProductPageComponent', () => {
  let component: EditFinancialProductPageComponent;
  let fixture: ComponentFixture<EditFinancialProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFinancialProductPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFinancialProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
