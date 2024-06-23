import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.scss'
})
export class EventoComponent {
  activeTab: string = '';

  constructor() {
    this.activeTab = ''
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
