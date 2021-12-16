import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { HeroProfile } from './heroes/heroes.component';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroes$ = new BehaviorSubject<HeroProfile[]>([
    {
      url: 'https://i.pinimg.com/564x/0e/82/d8/0e82d8b17b82bdf11957ee33b5aa6d02.jpg',
      name: 'Spider-man'
    },
    {
      url: 'https://i.pinimg.com/564x/88/39/2b/88392b3dc35aad62440a3866ee02a8e8.jpg',
      name: 'Iron man'
    },
    {
      name: 'Thor',
      url: 'https://i.pinimg.com/564x/d9/8d/6a/d98d6a443acaae36bfe34164ba3ac142.jpg'
    },
    {
      name: 'Loki',
      url: 'https://i.pinimg.com/564x/fb/2a/4e/fb2a4e59cfe0683bd67f9fa720130dfc.jpg'
    },
    {
      name: 'Captain America',
      url: 'https://i.pinimg.com/564x/47/7b/87/477b879603756ef9fe04f4eaff912d54.jpg'
    }
  ]);

  constructor() { }

  getHeroesList(): Observable<HeroProfile[]> {
    return this.heroes$.asObservable();
  }

  createHero(hero: HeroProfile): Observable<any> {
    const currentValue = this.heroes$.getValue();
    this.heroes$.next([...currentValue, hero]);

    return of({success: true}).pipe(delay(500));
  }

  deleteHero(index: number): Observable<any> {
    const currentValue = this.heroes$.getValue();
    currentValue.splice(index, 1);

    return of({deleted: true}).pipe(delay(500));
  }
}
