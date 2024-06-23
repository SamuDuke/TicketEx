import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarProvinciaComponent } from './mostrar-provincia.component';

describe('MostrarProvinciaComponent', () => {
  let component: MostrarProvinciaComponent;
  let fixture: ComponentFixture<MostrarProvinciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarProvinciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarProvinciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
