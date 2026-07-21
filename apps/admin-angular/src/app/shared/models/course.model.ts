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
