import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService  {
  createDb() {
    const superheroes: SuperHero[] = [
      { id: 1, name: 'Spiderman', power: 'Agilidad' },
      { id: 2, name: 'Superman', power: 'Vuelo' },
      { id: 3, name: 'Wonder Woman', power: 'Fuerza' },
      { id: 4, name: 'Batman', power: 'Inteligencia' },
      { id: 5, name: 'Hulk', power: 'Super fuerza' },
      { id: 6, name: 'Iceman', power: 'Lanzar hielo' },

    ];
    return { superheroes };
  }

  genId(superheroes: SuperHero[]): number {
    return superheroes.length > 0 ? Math.max(...superheroes.map(hero => hero.id || 0)) + 1 : 1;
  }
}

export interface SuperHero {
  id: number;
  name: string;
  power: string;
}
