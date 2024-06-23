import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploraComponent } from './explora.component';

describe('ExploraComponent', () => {
  let component: ExploraComponent;
  let fixture: ComponentFixture<ExploraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExploraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
