import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarLugarComponent } from './mostrar-lugar.component';

describe('MostrarLugarComponent', () => {
  let component: MostrarLugarComponent;
  let fixture: ComponentFixture<MostrarLugarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarLugarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarLugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
