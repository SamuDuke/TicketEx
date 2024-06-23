import { Component, Input } from '@angular/core';
import { ExploraComponent } from '../explora/explora.component';
import { BuscarComponent } from '../buscar/buscar.component';
import { EntradasComponent } from '../entradas/entradas.component';
import { CuentaComponent } from '../cuenta/cuenta.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ExploraComponent, BuscarComponent, EntradasComponent, CuentaComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  @Input() usuario: any

  actualizar(param: string) {
    const profileTab = document.getElementById('pills-profile-tab');
    const ticketsTab = document.getElementById('pills-contact-tab');
    const profileContent = document.getElementById('pills-profile');
    const ticketsContent = document.getElementById('pills-tickets');
    const profileButton = document.getElementById('pills-disabled-tab');
    const ticketsButton = document.getElementById('pills-contact-tab');

    if (param === 'entradas') {
      if (profileTab && profileContent) {
        profileTab.classList.remove('active');
        profileContent.classList.remove('show', 'active');
      }
      if (ticketsTab && ticketsContent) {
        ticketsTab.classList.add('active');
        ticketsContent.classList.add('show', 'active');
      }
      if(profileButton && ticketsButton) {
        profileButton.classList.remove('active');
        ticketsButton.classList.add('active');
      }
    }
  }

}
