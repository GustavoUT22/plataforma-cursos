import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "../../shared/models/course.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getCourses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/courses`);
  }

  getCourse(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/courses/${id}`);
  }

  createCourse(course: Partial<Course>): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post(`${this.apiUrl}/courses`, course, { headers });
  }

  updateCourse(id: string, course: Partial<Course>): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.put(`${this.apiUrl}/courses/${id}`, course, { headers });
  }

  deleteCourse(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.delete(`${this.apiUrl}/courses/${id}`, { headers });
  }
}