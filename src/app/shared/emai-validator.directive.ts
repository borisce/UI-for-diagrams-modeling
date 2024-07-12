import {UntypedFormControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const emailControlValidator: ValidatorFn = (control: UntypedFormControl):
  ValidationErrors | null => {
  let email = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
  return control.value && !email.test(control.value) ? {invalidEmail: true} : null;
};
