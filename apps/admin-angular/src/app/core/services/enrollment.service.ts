import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  enroll(courseId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/enrollments`, { courseId }, { headers: this.getHeaders() });
  }

  getMyEnrollments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/enrollments/me`, { headers: this.getHeaders() });
  }

  getAllEnrollments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/enrollments`, { headers: this.getHeaders() });
  }

  deleteEnrollment(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/enrollments/${id}`, { headers: this.getHeaders() });
  }

  deleteMyEnrollment(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/enrollments/me/${id}`, { headers: this.getHeaders() });
  }
}
