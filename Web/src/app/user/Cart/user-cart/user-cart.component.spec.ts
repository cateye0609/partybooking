import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserCartComponent } from './user-cart.component';

describe('UserCartComponent', () => {
  let component: UserCartComponent;
  let fixture: ComponentFixture<UserCartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});