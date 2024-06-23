import { Routes } from '@angular/router';
import { EntradaComponent } from './entrada.component';
import { MostrarEntradaComponent } from './mostrar-entrada/mostrar-entrada.component';
import { CrearEntradaComponent } from './crear-entrada/crear-entrada.component';
import { EditarEntradaComponent } from './editar-entrada/editar-entrada.component';

export const routes: Routes = [
    {
        path: '',
        component: EntradaComponent,
        children: [
            {
                path: 'mostrar',
                component: MostrarEntradaComponent
            },
            {
                path: 'crear',
                component: CrearEntradaComponent
            },
            {
                path: 'editar/:id',
                component: EditarEntradaComponent
            }
        ]
    }
]