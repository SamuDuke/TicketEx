import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCcaaComponent } from './editar-ccaa.component';

describe('EditarCcaaComponent', () => {
  let component: EditarCcaaComponent;
  let fixture: ComponentFixture<EditarCcaaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarCcaaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarCcaaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
