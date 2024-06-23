import { Routes } from '@angular/router';
import { CcaaComponent } from './ccaa.component';
import { CrearCcaaComponent } from './crear-ccaa/crear-ccaa.component';
import { EditarCcaaComponent } from './editar-ccaa/editar-ccaa.component';
import { MostrarCcaaComponent } from './mostrar-ccaa/mostrar-ccaa.component';

export const routes: Routes = [
    {
        path: '',
        component: CcaaComponent,
        children: [
            {
                path: 'mostrar',
                component: MostrarCcaaComponent
            },
            {
                path: 'crear',
                component: CrearCcaaComponent
            },
            {
                path: 'editar/:id',
                component: EditarCcaaComponent
            }
        ]
    }
]