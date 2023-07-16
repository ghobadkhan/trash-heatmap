import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLitterComponent } from './report-litter.component';

describe('ReportLitterComponent', () => {
  let component: ReportLitterComponent;
  let fixture: ComponentFixture<ReportLitterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportLitterComponent]
    });
    fixture = TestBed.createComponent(ReportLitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
