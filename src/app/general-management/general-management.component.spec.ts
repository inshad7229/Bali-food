import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralManagementComponent } from './general-management.component';

describe('GeneralManagementComponent', () => {
  let component: GeneralManagementComponent;
  let fixture: ComponentFixture<GeneralManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
