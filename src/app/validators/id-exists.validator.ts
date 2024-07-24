import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  map,
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { FinancialProductsService } from '../services/financial-products.service';

@Injectable({ providedIn: 'root' })
export class IdExistsValidator implements AsyncValidator {
  constructor(private financialProductsService: FinancialProductsService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return of(control.value).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value) =>
        this.financialProductsService.checkIdExists(value).pipe(
          map((exists) => {
            return exists ? { idExists: true } : null;
          }),
          catchError(() => {
            return of({ asyncError: true });
          })
        )
      )
    );
  }
}
