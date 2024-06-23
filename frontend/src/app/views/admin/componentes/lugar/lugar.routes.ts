import { Routes } from '@angular/router';
import { LugarComponent } from './lugar.component';
import { CrearLugarComponent } from './crear-lugar/crear-lugar.component';
import { EditarLugarComponent } from './editar-lugar/editar-lugar.component';
import { MostrarLugarComponent } from './mostrar-lugar/mostrar-lugar.component';

export const routes: Routes = [
    {
        path: '',
        component: LugarComponent,
        children: [
            {
                path: 'mostrar',
                component: MostrarLugarComponent
            },
            {
                path: 'crear',
                component: CrearLugarComponent
            },
            {
                path: 'editar/:id',
                component: EditarLugarComponent
            }
        ]
    }
]