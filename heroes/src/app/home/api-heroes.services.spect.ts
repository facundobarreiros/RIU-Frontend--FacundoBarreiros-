import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SuperHeroService } from './api-heroes.service';
import { SuperHero } from '../in-memory-data.service';

describe('SuperHeroService', () => {
  let service: SuperHeroService;
  let httpMock: HttpTestingController;
  const baseUrl = 'api/superheroes';

  const dummyHeroes: SuperHero[] = [
    { id: 1, name: 'Batman', power: 'Inteligencia' },
    { id: 2, name: 'Superman', power: 'Vuelo' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SuperHeroService]
    });

    service = TestBed.inject(SuperHeroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería registrar un superhéroe', () => {
    const newHero: SuperHero = { id: 3, name: 'Wonder Woman', power: 'Fuerza' };

    service.registerSuperHero(newHero).subscribe(hero => {
      expect(hero).toEqual(newHero);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newHero);
  });

  it('debería obtener todos los superhéroes', () => {
    service.getAllSuperHeroes().subscribe(heroes => {
      expect(heroes.length).toBe(2);
      expect(heroes).toEqual(dummyHeroes);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyHeroes);
  });

  it('debería obtener un superhéroe por id', () => {
    const hero: SuperHero = dummyHeroes[0];

    service.getSuperHeroById(hero.id).subscribe(data => {
      expect(data).toEqual(hero);
    });

    const req = httpMock.expectOne(`${baseUrl}/${hero.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(hero);
  });

  it('debería buscar superhéroes por nombre', () => {
    const name = 'Bat';
    service.searchSuperHeroes(name).subscribe(heroes => {
      expect(heroes).toEqual([dummyHeroes[0]]);
    });

    const req = httpMock.expectOne(`${baseUrl}?name_like=${name}`);
    expect(req.request.method).toBe('GET');
    req.flush([dummyHeroes[0]]);
  });

  it('debería actualizar un superhéroe', () => {
    const hero: SuperHero = dummyHeroes[0];
    const updatedHero = { ...hero, name: 'Batman Actualizado' };

    service.updateSuperHero(updatedHero).subscribe(data => {
      expect(data).toEqual(updatedHero);
    });

    const req = httpMock.expectOne(`${baseUrl}/${updatedHero.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedHero);
  });

  it('debería lanzar error al actualizar un superhéroe sin id', () => {
    const heroWithoutId = { name: 'Sin ID', power: 'Desconocido' } as SuperHero;
    expect(() => service.updateSuperHero(heroWithoutId))
      .toThrowError('El superhéroe debe tener un id para ser actualizado');
  });

  it('debería eliminar un superhéroe', () => {
    const heroId = 1;
    service.deleteSuperHero(heroId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${baseUrl}/${heroId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ success: true });
  });

});
