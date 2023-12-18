import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloOperarioComponent } from './modulo-operario.component';

describe('ModuloOperarioComponent', () => {
  let component: ModuloOperarioComponent;
  let fixture: ComponentFixture<ModuloOperarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuloOperarioComponent]
    });
    fixture = TestBed.createComponent(ModuloOperarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
