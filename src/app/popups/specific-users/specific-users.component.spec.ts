import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificUsersComponent } from './specific-users.component';

describe('SpecificUsersComponent', () => {
  let component: SpecificUsersComponent;
  let fixture: ComponentFixture<SpecificUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
