import { Component, inject, OnInit, signal } from '@angular/core';
import { UserModel } from '../../../shared/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-admin-students',
  imports: [NgClass, DatePipe],
  templateUrl: './admin-students.html',
  styleUrl: './admin-students.css',
})
export class AdminStudents implements OnInit {
  users = signal<UserModel[]>([]);

  private userService = inject(UserService);

  get allActives() {
    return this.users().filter((user) => user.status === 'active').length;
  }
  get allPending() {
    return this.users().filter((user) => user.status === 'pending').length;
  }
  get allSuspended() {
    return this.users().filter((user) => user.status === 'suspended').length;
  }

  get allLenghtUsers() {
    return this.users().length;
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        const students = data.filter((user) => user.role === 'student');
        //console.log('List Users', data);
        this.users.set(students);
        console.log(data);
      },
      error: (error) => {
        console.log(`Error to get courses`, error);
      },
    });
  }
}
