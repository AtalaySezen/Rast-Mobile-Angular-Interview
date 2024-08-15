import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRepository } from '../../shared/repositories/auth.repository';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authRepository = inject(AuthRepository);
  passwordType: string = 'password';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)])
  });

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
