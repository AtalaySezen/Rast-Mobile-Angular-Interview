import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRepository } from '../../shared/repositories/auth.repository';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  authRepository = inject(AuthRepository);
  router = inject(Router);

  passwordType: string = 'password';

  loginForm = new FormGroup({
    email: new FormControl('user@rastmobile.com', [Validators.required, Validators.email]),
    password: new FormControl('123456', [Validators.required, Validators.minLength(3), Validators.maxLength(20)])
  });

  ngOnInit() {
    this.authRepository.checkUserToken();
  }

  login() {
    if (this.loginForm.valid) {
      this.authRepository.Login(this.loginForm.value.email!, this.loginForm.value.password!);
    }
  }

  showPassword(event: MouseEvent) {
    event.preventDefault();
    this.passwordType = (this.passwordType === 'password') ? 'text' : 'password';
  }

}
