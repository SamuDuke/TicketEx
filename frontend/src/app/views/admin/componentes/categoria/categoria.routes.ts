import { Routes } from '@angular/router';
import { CategoriaComponent } from './categoria.component';
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { MostrarCategoriaComponent } from './mostrar-categoria/mostrar-categoria.component';

export const routes: Routes = [
    {
        path: '',
        component: CategoriaComponent,
        children: [
            {
                path: 'mostrar',
                component: MostrarCategoriaComponent
            },
            {
                path: 'crear',
                component: CrearCategoriaComponent
            },
            {
                path: 'editar/:id',
                component: EditarCategoriaComponent
            }
        ]
    }
]