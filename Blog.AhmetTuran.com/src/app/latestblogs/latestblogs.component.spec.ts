import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestblogsComponent } from './latestblogs.component';

describe('LatestblogsComponent', () => {
  let component: LatestblogsComponent;
  let fixture: ComponentFixture<LatestblogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestblogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LatestblogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
