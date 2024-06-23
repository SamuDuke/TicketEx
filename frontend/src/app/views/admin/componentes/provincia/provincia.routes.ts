import { Routes } from '@angular/router';
import { ProvinciaComponent } from './provincia.component';
import { CrearProvinciaComponent } from './crear-provincia/crear-provincia.component';
import { EditarProvinciaComponent } from './editar-provincia/editar-provincia.component';
import { MostrarProvinciaComponent } from './mostrar-provincia/mostrar-provincia.component';

export const routes: Routes = [
    {
        path: '',
        component: ProvinciaComponent,
        children: [
            {
                path: 'mostrar',
                component: MostrarProvinciaComponent
            },
            {
                path: 'crear',
                component: CrearProvinciaComponent
            },
            {
                path: 'editar/:id',
                component: EditarProvinciaComponent
            }
        ]
    }
]