import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GizlilikComponent } from './gizlilik.component';

describe('GizlilikComponent', () => {
  let component: GizlilikComponent;
  let fixture: ComponentFixture<GizlilikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GizlilikComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GizlilikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
