import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

export const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: 'categoria',
                loadChildren: () => import('./componentes/categoria/categoria.routes').then(m => m.routes)
            },
            {
                path: 'ccaa',
                loadChildren: () => import('./componentes/ccaa/ccaa.routes').then(m => m.routes)
            },
            {
                path: 'entrada',
                loadChildren: () => import('./componentes/entrada/entrada.routes').then(m => m.routes)
            },
            {
                path: 'evento',
                loadChildren: () => import('./componentes/evento/evento.routes').then(m => m.routes)
            },
            {
                path: 'lugar',
                loadChildren: () => import('./componentes/lugar/lugar.routes').then(m => m.routes)
            },
            {
                path: 'provincia',
                loadChildren: () => import('./componentes/provincia/provincia.routes').then(m => m.routes)
            },
            {
                path: 'usuario',
                loadChildren: () => import('./componentes/usuario/usuario.routes').then(m => m.routes)
            },
        ]
    }
];


