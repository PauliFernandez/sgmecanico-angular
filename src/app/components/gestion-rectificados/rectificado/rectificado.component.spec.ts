import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectificadoComponent } from './rectificado.component';

describe('RectificadoComponent', () => {
  let component: RectificadoComponent;
  let fixture: ComponentFixture<RectificadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RectificadoComponent]
    });
    fixture = TestBed.createComponent(RectificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
