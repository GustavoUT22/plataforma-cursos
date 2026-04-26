import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CourseList } from './features/courses/course-list/course-list';

@Component({
  selector: 'app-root',
  imports: [CommonModule, CourseList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  

}


/**
 * 1- selector es el nombre del componente, en este caso es "app-root"
 * 2- templateUrl es la ruta del archivo HTML que contiene la plantilla del componente
 * 3- styleUrl es la ruta del archivo CSS que contiene los estilos del componente
 * 4- imports nos permitite importar otros módulos o componentes que necesitamos para nuestro 
 * componente, en este caso importamos RouterOutlet para poder usar las rutas en nuestra aplicación
 */

// PASOS PARA COMPLETAR LA APLICACIÓN
/**
 * 1- Crear los datos de prueba para cursos, pueden ser un array de objetos con las propiedades id, nombre, descripcion, etc.
 * 2- Crear el componente Home, donde se mostrarán todos los cursos, se podrá crear nuevos cursos y eliminar cursos.
 * 3- Crear el componente DetalleCurso, donde se mostrará el detalle de un curso y se podrá editar.
 * 4- Configurar las rutas para que al navegar a /home se muestre el componente Home y al navegar a /detalle/:id se muestre el componente DetalleCurso.
 * 5- Implementar la lógica para crear, eliminar y editar cursos en los componentes correspondientes.
 */