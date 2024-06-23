import { Routes } from '@angular/router';
import { EventoComponent } from './evento.component';
import { CrearEventoComponent } from './crear-evento/crear-evento.component';
import { EditarEventoComponent } from './editar-evento/editar-evento.component';
import { MostrarEventoComponent } from './mostrar-evento/mostrar-evento.component';

export const routes: Routes = [
    {
        path: '',
        component: EventoComponent,
        children: [
            {
                path: 'mostrar',
                component: MostrarEventoComponent
            },
            {
                path: 'crear',
                component: CrearEventoComponent
            },
            {
                path: 'editar/:id',
                component: EditarEventoComponent
            }
        ]
    }
]