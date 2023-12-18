import { TestBed } from '@angular/core/testing';

import { RectificadosService } from './rectificados.service';

describe('RectificadosService', () => {
  let service: RectificadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RectificadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
