import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private jwtSubject = new BehaviorSubject<string | null>(this.getToken());
  jwt$ = this.jwtSubject.asObservable();

  login(credentials: { username: string; password: string }) {
    return this.http.post<{ token: string }>(
      'http://localhost:8080/auth/login',
      credentials
    ).pipe(
      tap(res => {
        this.setToken(res.token);
        this.jwtSubject.next(res.token);
      })
    );
  }

  logout() {
    this.removeToken();
    this.jwtSubject.next(null);
    this.router.navigate(['/login']);
  }

  private setToken(token: string) {
    localStorage.setItem('jwt', token);
  }
  private getToken(): string | null {
    return localStorage.getItem('jwt');
  }
  private removeToken() {
    localStorage.removeItem('jwt');
  }
  get token() {
    return this.getToken();
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
