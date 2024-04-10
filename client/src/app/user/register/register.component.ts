import { Component } from '@angular/core';
import { Validators,FormBuilder } from '@angular/forms';
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
      passGroup: { password, rePassword } = {},
    } = this.formRegister.value;

    this.userService
      .register(username!, email!, password!, rePassword!)
      .subscribe(() => {
        this.router.navigate(['/posts']);
      });
  }
}
  
