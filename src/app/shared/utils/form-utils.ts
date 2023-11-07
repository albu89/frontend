import { FormGroup } from '@angular/forms';

export function hasFormError(path: string, errorType: string, form: FormGroup): boolean {
  const hasError = form.get(path)?.hasError(errorType);
  return hasError || false;
}

export function isFormFieldInvalid(fieldName: string, form: FormGroup): boolean {
  const control = form.get(fieldName);
  control?.updateValueAndValidity();

  const isInvalid = control?.invalid && control?.touched;
  return isInvalid || false;
}

export function isFormFieldTouched(fieldName: string, form: FormGroup): boolean {
  const control = form.get(fieldName);
  return control?.touched ?? false;
}
