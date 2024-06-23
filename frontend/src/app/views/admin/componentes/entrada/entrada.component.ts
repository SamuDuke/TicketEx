import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-entrada',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './entrada.component.html',
  styleUrl: './entrada.component.scss'
})
export class EntradaComponent {
  activeTab: string = '';

  constructor() {
    this.activeTab = ''
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
