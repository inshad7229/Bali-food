import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeMangementComponent } from './recipe-mangement.component';

describe('RecipeMangementComponent', () => {
  let component: RecipeMangementComponent;
  let fixture: ComponentFixture<RecipeMangementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeMangementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeMangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
