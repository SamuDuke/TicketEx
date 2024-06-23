import { Routes } from '@angular/router';
import { UsuarioComponent } from './usuario.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { MostrarUsuarioComponent } from './mostrar-usuario/mostrar-usuario.component';

export const routes: Routes = [
    {
        path: '',
        component: UsuarioComponent,
        children: [
            {
                path: 'mostrar',
                component: MostrarUsuarioComponent
            },
            {
                path: 'crear',
                component: CrearUsuarioComponent
            },
            {
                path: 'editar/:id',
                component: EditarUsuarioComponent
            }
        ]
    }
]