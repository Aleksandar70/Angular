import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalPageInfoComponent } from './appraisal-page-info.component';

describe('AppraisalPageInfoComponent', () => {
  let component: AppraisalPageInfoComponent;
  let fixture: ComponentFixture<AppraisalPageInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisalPageInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalPageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
