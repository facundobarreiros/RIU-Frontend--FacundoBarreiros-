import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuperHero } from '../in-memory-data.service';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class SuperHeroService {
  [x: string]: any;
  private baseUrl = 'api/superheroes';

  constructor(private http: HttpClient) {}

  registerSuperHero(hero: SuperHero): Observable<SuperHero> {
    return this.http.post<SuperHero>(this.baseUrl, hero);
  }

  getAllSuperHeroes(): Observable<SuperHero[]> {
    return this.http.get<SuperHero[]>(this.baseUrl);
  }

  getSuperHeroById(id: number): Observable<SuperHero> {
    return this.http.get<SuperHero>(`${this.baseUrl}/${id}`);
  }

  searchSuperHeroes(name: string): Observable<SuperHero[]> {
    return this.http.get<SuperHero[]>(`${this.baseUrl}?name_like=${name}`);
  }

  updateSuperHero(hero: SuperHero): Observable<SuperHero> {
    if (!hero.id) {
      throw new Error('El superhéroe debe tener un id para ser actualizado');
    }
    return this.http.put<SuperHero>(`${this.baseUrl}/${hero.id}`, hero);
  }

  deleteSuperHero(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
