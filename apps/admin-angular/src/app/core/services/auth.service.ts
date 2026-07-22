import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  login(email: string, password: string) {
    return this.http.post<{ token: string; message: string }>(`${this.apiUrl}/login`, {
      email,
      password,
    });
  }

  register(name: string, email: string, password: string, role: string = 'student') {
    return this.http.post<{ message: string }>(`${this.apiUrl}/register`, {
      name,
      email,
      password,
      role,
      status: 'active',
    });
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    } catch {
      return null;
    }
  }
}
