import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of, throwError } from 'rxjs';
import { HeroProfile } from './heroes/heroes.component';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroes$ = new BehaviorSubject<HeroProfile[]>([
    {
      id: 'c4c02788-138f-3695-90b8-bdb1b2fe979b',
      url: 'https://i.pinimg.com/564x/0e/82/d8/0e82d8b17b82bdf11957ee33b5aa6d02.jpg',
      name: 'Spider-man',
      age: 17
    },
    {
      id: 'de13e97b-022d-1546-8b93-82a82bb9a26b',
      url: 'https://i.pinimg.com/564x/88/39/2b/88392b3dc35aad62440a3866ee02a8e8.jpg',
      name: 'Iron man',
      age: 42
    },
    {
      id: 'b550d226-f204-c0bd-a28a-a7534ec79c97',
      name: 'Thor',
      url: 'https://i.pinimg.com/564x/d9/8d/6a/d98d6a443acaae36bfe34164ba3ac142.jpg',
      age: 1521
    },
    {
      id: '05ce7084-a8cc-e62e-b969-149ed7c732ff',
      name: 'Loki',
      url: 'https://i.pinimg.com/564x/fb/2a/4e/fb2a4e59cfe0683bd67f9fa720130dfc.jpg',
      age: 1519
    },
    {
      id: '67b5a5cb-c0b6-7e66-ab57-cf2ab6093417',
      name: 'Captain America',
      url: 'https://i.pinimg.com/564x/47/7b/87/477b879603756ef9fe04f4eaff912d54.jpg',
      age: 101
    }
  ]);

  private defaultAvatar = 'https://i.pinimg.com/564x/95/76/57/9576572d657f37978aede9fca38e3da0.jpg';

  constructor() { }

  private guidGenerator(): string {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }

  getHeroesList(): Observable<HeroProfile[]> {
    return this.heroes$.asObservable();
  }

  getHeroDetails(id: string): Observable<HeroProfile> {
    const list = this.heroes$.getValue();
    const index = list.findIndex(hero => hero.id === id);
    if (index > -1) {
      return of(list[index]);
    }
    return throwError(() => new Error('Hero not found'));
  }

  createHero(hero: HeroProfile): Observable<any> {
    const currentValue = this.heroes$.getValue();
    hero = {
      ...hero,
      id: this.guidGenerator(),
      ...((hero?.url && hero?.url !== '') ? { url: hero?.url } : { url: this.defaultAvatar })
    };
    this.heroes$.next([...currentValue, hero]);

    return of({ success: true }).pipe(delay(500));
  }

  deleteHero(id: string): Observable<any> {
    const currentValue = this.heroes$.getValue();
    const index = currentValue.findIndex(hero => hero.id === id);
    currentValue.splice(index, 1);

    return of({ deleted: true }).pipe(delay(500));
  }
}
