import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopblogsComponent } from './topblogs.component';

describe('TopblogsComponent', () => {
  let component: TopblogsComponent;
  let fixture: ComponentFixture<TopblogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopblogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopblogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
