import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-provincia',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './provincia.component.html',
  styleUrl: './provincia.component.scss'
})
export class ProvinciaComponent {

  activeTab: string = '';

  constructor() {
    this.activeTab = ''
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
