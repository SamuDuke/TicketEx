import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProvinciaComponent } from './editar-provincia.component';

describe('EditarProvinciaComponent', () => {
  let component: EditarProvinciaComponent;
  let fixture: ComponentFixture<EditarProvinciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarProvinciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarProvinciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
