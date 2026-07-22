<<<<<<< HEAD
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
=======
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
>>>>>>> 4828cdaa0e894dde8498eb386907b11efa108cc7
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

<<<<<<< HEAD
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
=======
  // El admin inscribe a un estudiante en un curso
  enrollStudent(studentId: string, courseId: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/enrollments/admin`,
      { studentId, courseId },
      { headers: this.authHeaders() },
    );
>>>>>>> 4828cdaa0e894dde8498eb386907b11efa108cc7
  }
}
