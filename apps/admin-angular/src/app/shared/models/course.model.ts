export interface Course {
  _id: string;
  id?: string;
  name: string;
  category: string;
  teacher: string | { _id: string; name: string; email: string };
  modality: string;
  duration: number;
  vacancies: number;
  price: number;
  startDate: Date;
  isActive: boolean;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}