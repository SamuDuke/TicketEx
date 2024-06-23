import { Routes } from '@angular/router';
import { ClientComponent } from './client.component';

export const routes: Routes = [
    {
        path: '',
        component: ClientComponent,
        children: [

        ]
    },
];