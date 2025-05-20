import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../auth/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="login()">
      <input type="text" [(ngModel)]="username" name="username" placeholder="Usuário" required>
      <input type="password" [(ngModel)]="password" name="password" placeholder="Senha" required>
      <button type="submit">Entrar</button>
      <div *ngIf="erro" style="color:red;">{{ erro }}</div>
    </form>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  erro?: string;

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login({ username: this.username, password: this.password })
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: () => this.erro = 'Login inválido'
      });
  }
}
