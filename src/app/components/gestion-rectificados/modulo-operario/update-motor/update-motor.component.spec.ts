import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMotorComponent } from './update-motor.component';

describe('UpdateMotorComponent', () => {
  let component: UpdateMotorComponent;
  let fixture: ComponentFixture<UpdateMotorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMotorComponent]
    });
    fixture = TestBed.createComponent(UpdateMotorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
