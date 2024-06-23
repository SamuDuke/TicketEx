import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarCcaaComponent } from './mostrar-ccaa.component';

describe('MostrarCcaaComponent', () => {
  let component: MostrarCcaaComponent;
  let fixture: ComponentFixture<MostrarCcaaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarCcaaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarCcaaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
