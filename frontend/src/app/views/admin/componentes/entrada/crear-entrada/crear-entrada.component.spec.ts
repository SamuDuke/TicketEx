import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEntradaComponent } from './crear-entrada.component';

describe('CrearEntradaComponent', () => {
  let component: CrearEntradaComponent;
  let fixture: ComponentFixture<CrearEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearEntradaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
