import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-lugar',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './lugar.component.html',
  styleUrl: './lugar.component.scss'
})
export class LugarComponent {
  activeTab: string = '';

  constructor() {
    this.activeTab = ''
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
