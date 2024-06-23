import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-ccaa',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './ccaa.component.html',
  styleUrl: './ccaa.component.scss'
})
export class CcaaComponent {
  
  activeTab: string = '';

  constructor(){
    this.activeTab = ''
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
