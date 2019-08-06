import {AbstractControl, ValidatorFn} from '@angular/forms';

export function updatePasswordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const minlength = 6;
    const password = String(control.value);
    return password === '' || password.length >= minlength ? null : {minlength: minlength};
  };
}
