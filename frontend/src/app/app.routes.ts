import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./views/componentes/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'registro',
        loadComponent: () => import('./views/componentes/registro/registro.component').then(m => m.RegistroComponent)
    },
    {
        path: 'admin',
        loadChildren: () => import('./views/admin/admin.routes').then(m => m.routes)
    },
    {
        path: 'client',
        loadChildren: () => import('./views/client/client.routes').then(m => m.routes)
    },
    {
        path: 'evento/:id',
        loadComponent: () => import('./views/client/componentes/detalle/detalle.component').then(m => m.DetalleComponent)
    },
    {
        path: 'entrada/:id',
        loadComponent: () => import('./views/client/componentes/entradas/entrada-detalle/entrada-detalle.component').then(m => m.EntradaDetalleComponent)
    },
    {
        path: 'subir/entrada',
        loadComponent: () => import('./views/client/componentes/entradas/entrada-subir/entrada-subir.component').then(m => m.EntradaSubirComponent)
    },
    {
        path: 'cuenta/editar/:id',
        loadComponent: () => import('./views/client/componentes/cuenta/cuenta-editar/cuenta-editar.component').then(m => m.CuentaEditarComponent)
    },
];
