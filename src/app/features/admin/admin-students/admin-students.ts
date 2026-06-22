import { Component, inject, OnInit, signal } from '@angular/core';
import { UserModel } from '../../../shared/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-admin-students',
  imports: [NgClass],
  templateUrl: './admin-students.html',
  styleUrl: './admin-students.css',
})
export class AdminStudents implements OnInit {
  users = signal<UserModel[]>([]);

  private userService = inject(UserService);

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        const students = data.filter((user) => user.role === 'student');
        //console.log('List Users', data);
        this.users.set(students);
      },
      error: (error) => {
        console.log(`Error to get courses`, error);
      },
    });
  }
}
