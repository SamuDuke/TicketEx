import { Component } from '@angular/core';
import { MenuComponent } from './componentes/menu/menu.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
