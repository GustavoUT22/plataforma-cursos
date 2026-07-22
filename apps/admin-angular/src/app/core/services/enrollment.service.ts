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

  // El estudiante autenticado se inscribe a un curso
  enroll(courseId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/enrollments`, { courseId }, { headers: this.authHeaders() });
  }

  // El admin inscribe a un estudiante en un curso
  enrollStudent(studentId: string, courseId: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/enrollments/admin`,
      { studentId, courseId },
      { headers: this.authHeaders() },
    );
  }

  getMyEnrollments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/enrollments/me`, { headers: this.authHeaders() });
  }

  getAllEnrollments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/enrollments`, { headers: this.authHeaders() });
  }

  deleteEnrollment(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/enrollments/${id}`, { headers: this.authHeaders() });
  }

  deleteMyEnrollment(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/enrollments/me/${id}`, { headers: this.authHeaders() });
  }
}
