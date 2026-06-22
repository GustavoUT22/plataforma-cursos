import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>('http://localhost:5000/api/users');
  }
}
