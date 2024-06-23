import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaSubirComponent } from './entrada-subir.component';

describe('EntradaSubirComponent', () => {
  let component: EntradaSubirComponent;
  let fixture: ComponentFixture<EntradaSubirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntradaSubirComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntradaSubirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
