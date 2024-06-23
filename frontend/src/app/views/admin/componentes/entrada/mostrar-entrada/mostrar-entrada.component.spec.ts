import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarEntradaComponent } from './mostrar-entrada.component';

describe('MostrarEntradaComponent', () => {
  let component: MostrarEntradaComponent;
  let fixture: ComponentFixture<MostrarEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarEntradaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
