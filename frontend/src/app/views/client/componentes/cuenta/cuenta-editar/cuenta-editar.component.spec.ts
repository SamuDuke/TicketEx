import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaEditarComponent } from './cuenta-editar.component';

describe('CuentaEditarComponent', () => {
  let component: CuentaEditarComponent;
  let fixture: ComponentFixture<CuentaEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuentaEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuentaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
