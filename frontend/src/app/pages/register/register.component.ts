import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRepository } from '../../shared/repositories/auth.repository';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  authRepository = inject(AuthRepository);
  passwordType: string = 'password';

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)])
  });

  ngOnInit() {
    this.authRepository.checkUserToken();
  }

  userRegister() {
    if (this.registerForm.valid) {
      this.authRepository.Register(this.registerForm.value.email!, this.registerForm.value.password!);
    }
  }

  showPassword(event: MouseEvent) {
    event.preventDefault();
    this.passwordType = (this.passwordType === 'password') ? 'text' : 'password';
  }
}
