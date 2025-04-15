import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería emitir false inicialmente', (done) => {
    service.loading$.subscribe(value => {
      expect(value).toBeFalse();
      done();
    });
  });

  it('debería emitir true cuando se llama a show()', (done) => {
    service.loading$.subscribe(value => {
      if (value === true) {
        expect(value).toBeTrue();
        done();
      }
    });

    service.show();
  });

});
