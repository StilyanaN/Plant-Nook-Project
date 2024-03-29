import { ValidatorFn } from '@angular/forms';

export function matchPassValidator(
  passwordControlName: string,
  rePasswordControlName: string
): ValidatorFn {
  return (control) => {
    const passwordControl = control.get(passwordControlName);
    const rePasswordControl = control.get(rePasswordControlName);
    const areMatching =
      passwordControl?.value == rePasswordControl?.value;

    return areMatching ? null : { matchPassValidator: true };
  };
}