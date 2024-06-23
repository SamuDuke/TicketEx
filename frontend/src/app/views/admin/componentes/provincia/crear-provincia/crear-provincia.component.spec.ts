import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProvinciaComponent } from './crear-provincia.component';

describe('CrearProvinciaComponent', () => {
  let component: CrearProvinciaComponent;
  let fixture: ComponentFixture<CrearProvinciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearProvinciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearProvinciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
