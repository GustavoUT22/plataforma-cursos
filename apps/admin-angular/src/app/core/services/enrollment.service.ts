import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private http = inject(HttpClient);
  private apiUrl = import.meta.env.NG_APP_API_URL;

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // El admin inscribe a un estudiante en un curso
  enrollStudent(studentId: string, courseId: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/enrollments/admin`,
      { studentId, courseId },
      { headers: this.authHeaders() },
    );
  }
}
