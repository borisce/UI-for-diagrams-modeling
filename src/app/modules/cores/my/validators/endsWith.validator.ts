import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function endsWithValidator(extension: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value: string = control.value;

    if (!value) {
      return null;
    }

    const re: RegExp = new RegExp('.*\.' + extension + '$');
    const endsWith: boolean = re.test(value);
    return !endsWith ? {invalidFileType: true} : null;
  };
}
