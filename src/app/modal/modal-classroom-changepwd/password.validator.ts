import { AbstractControl, FormControl, UntypedFormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordValidator(form: UntypedFormGroup): ValidationErrors {
    const pwd1 = form.controls.newPassword.value;
    const pwd2 = form.controls.passwordVerification.value;
    return pwd1 == pwd2 ? null : { 'no_match': true };
}