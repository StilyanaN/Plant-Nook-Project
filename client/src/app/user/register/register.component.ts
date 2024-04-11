import { Component } from '@angular/core';
import { Validators,FormBuilder, AbstractControl } from '@angular/forms';
import { EMAIL_DOMAINS } from 'src/app/shared/constants';
import { emailValidator } from 'src/app/shared/utils/email-validator';
import { matchPassValidator } from 'src/app/shared/utils/match-pass-validator';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  error: string | undefined;
  formRegister = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, emailValidator(EMAIL_DOMAINS)]],
    gender: ['', [Validators.required, this.genderValidator()]],
    passGroup: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(5)]],
        rePassword: ['', [Validators.required]],
      },
      {
        validators: [matchPassValidator('password', 'rePassword')],
      }
    ),
  });

  get passGroup() {
    return this.formRegister.get('passGroup');
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  register(): void {
    if (this.formRegister.invalid) {
      return;
    }

    const {
      username,
      email,
      gender,
      passGroup: { password, rePassword } = {},
    } = this.formRegister.value;

    this.userService
      .register(username!, email!,gender!, password!, rePassword!)
      .subscribe(() => {
        this.router.navigate(['/posts']);
      });
  }

  genderValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const gender = control.value;
      if (gender !== 'male' && gender !== 'female') {
        return { invalidGender: true };
      }
      return null;
    };
  }
}
  
