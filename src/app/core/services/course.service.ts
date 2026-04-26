import { Injectable, OnInit } from "@angular/core";

export interface Course {
  id: number;
  name: string;
  category: string;
  teacher: string;
  modality: string;
  duration: number;
  vacancies: number;
  price: number;
  startDate: Date;
  isActive: boolean;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Curso de Angular',
      category: 'Desarrollo web',
      teacher: 'Juan Pérez',
      modality: 'Presencial',
      duration: 40,
      vacancies: 20,
      price: 200,
      startDate: new Date('2024-07-01'),
      isActive: true,
      description: 'Aprende a desarrollar aplicaciones web con Angular.'
    },
    {
      id: 2,
      name: 'Curso de React',
      category: 'Desarrollo web',
      teacher: 'María Gómez',
      modality: 'Online',
      duration: 30,
      vacancies: 15,
      price: 150,
      startDate: new Date('2024-08-01'),
      isActive: true,
      description: 'Aprende a desarrollar aplicaciones web con React.'
    },
    {
      id: 3,
      name: 'Curso de Python',
      category: 'Programación',
      teacher: 'Carlos López',
      modality: 'Presencial',
      duration: 50,
      vacancies: 10,
      price: 250,
      startDate: new Date('2024-09-01'),
      isActive: true,
      description: 'Aprende a programar con Python.'
    }
  ];
  
  getCourses(): Course[] {
    return this.courses
  }

  getCourse(id: number): Course {
      const foundCourse = this.courses.find(ele => ele.id == id);
      if (!foundCourse){
          throw new Error("No encontrado")
      }

      return foundCourse;
  }
  
  createCourse(newCourse: Course): void {
    this.courses.push(newCourse);
  }
}