import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FinancialProduct } from '../../models/financial-product.interface';
import { dateValidator } from '../../validators/date.validator';
import { Subscription } from 'rxjs';
import { FormErrorComponent } from '../form-error/form-error.component';
import { IdExistsValidator } from '../../validators/id-exists.validator';
import { CommonModule } from '@angular/common';
import { transformDateFormat } from '../../utils/date.util';

@Component({
  selector: 'app-financial-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormErrorComponent],
  templateUrl: './financial-product-form.component.html',
  styleUrl: './financial-product-form.component.scss',
})
export class FinancialProductFormComponent implements OnInit, OnDestroy {
  form: FormGroup = this.fb.group({});
  @Input() product!: FinancialProduct;

  private subscription!: Subscription;
  editMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private idExistsValidator: IdExistsValidator
  ) {}

  private dateRevisionHandler() {
    const dateReleaseControl = this.form.get('dateRelease');
    const dateRevisionControl = this.form.get('dateRevision');
    if (dateReleaseControl && dateRevisionControl) {
      this.subscription = dateReleaseControl.valueChanges.subscribe((value) => {
        if (dateReleaseControl.valid) {
          const [day, month, year] = value.split('/').map(Number);
          const dateRelease = new Date(year, month - 1, day);
          const dateRevision = new Date(
            dateRelease.getFullYear() + 1,
            dateRelease.getMonth(),
            dateRelease.getDate()
          );

          const formattedDateRevision = `${('0' + dateRevision.getDate()).slice(
            -2
          )}/${('0' + (dateRevision.getMonth() + 1)).slice(
            -2
          )}/${dateRevision.getFullYear()}`;

          dateRevisionControl.setValue(formattedDateRevision, {
            emitEvent: true,
            onlySelf: false,
          });
        } else {
          dateRevisionControl.setValue('');
        }
      });
    }
  }

  resetForm() {
    const idControl = new FormControl(this.product?.id || '', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ],
      asyncValidators: this.editMode
        ? []
        : [this.idExistsValidator.validate.bind(this.idExistsValidator)],
      updateOn: 'change',
    });

    const nameControl = new FormControl(this.product?.name || '', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]);

    const descriptionControl = new FormControl(
      this.product?.description || '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(200)]
    );

    const logoControl = new FormControl(this.product?.logo || '', [
      Validators.required,
    ]);

    const dateReleaseControl = new FormControl(
      this.product?.date_release
        ? transformDateFormat(
            new Date(this.product?.date_release).toISOString()
          )
        : '',
      [Validators.required, dateValidator()]
    );

    const dateRevisionControl = new FormControl(
      this.product?.date_revision
        ? transformDateFormat(
            new Date(this.product?.date_revision).toISOString()
          )
        : '',
      [Validators.required]
    );

    if (this.editMode) {
      idControl.disable({ emitEvent: false, onlySelf: true });
    }

    this.form = this.fb.group({
      id: idControl,
      name: nameControl,
      description: descriptionControl,
      logo: logoControl,
      dateRelease: dateReleaseControl,
      dateRevision: dateRevisionControl,
    });

    this.form
      .get('dateRevision')
      ?.disable({ emitEvent: false, onlySelf: true });

    this.dateRevisionHandler();
  }

  ngOnInit(): void {
    this.editMode = this.product?.id ? true : false;
    this.resetForm();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
