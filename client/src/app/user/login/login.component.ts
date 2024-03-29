import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import {  UserForLogin } from 'src/app/types/user';
import { EMAIL_DOMAINS } from 'src/app/shared/constants';
import { emailValidator } from 'src/app/shared/utils/email-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  
  formLogin = this.fb.group({
    email: ['', [Validators.required, emailValidator(EMAIL_DOMAINS)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  login(): void {
    if (!this.formLogin.valid) {
      return;
    }

    const formData = this.formLogin.value
        this.userService
          .login(formData as UserForLogin)
          .subscribe((data) => {
            if (data?.error) {
              this.formLogin.reset();
              return;
            }
            this.router.navigate(['/home']);
          });
        }
  }


 

