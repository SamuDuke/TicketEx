import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCcaaComponent } from './crear-ccaa.component';

describe('CrearCcaaComponent', () => {
  let component: CrearCcaaComponent;
  let fixture: ComponentFixture<CrearCcaaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearCcaaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearCcaaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
