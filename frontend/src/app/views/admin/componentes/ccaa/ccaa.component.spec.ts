import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcaaComponent } from './ccaa.component';

describe('CcaaComponent', () => {
  let component: CcaaComponent;
  let fixture: ComponentFixture<CcaaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CcaaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CcaaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
