import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {

  activeTab: string = '';

  constructor() {
    this.activeTab = ''
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

}
