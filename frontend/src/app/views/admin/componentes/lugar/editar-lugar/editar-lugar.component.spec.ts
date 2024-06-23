import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarLugarComponent } from './editar-lugar.component';

describe('EditarLugarComponent', () => {
  let component: EditarLugarComponent;
  let fixture: ComponentFixture<EditarLugarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarLugarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarLugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
