import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap } from 'rxjs';
import { HeroService } from '../hero.service';
import { HeroProfile } from '../heroes/heroes.component';

export interface HeroDetailsState {
    hero: HeroProfile;
}

@Injectable()
export class HeroProfileComponentStore extends ComponentStore<HeroDetailsState> {
    constructor(
        private readonly heroService: HeroService
    ) {
        super({
            hero: {
                id: '',
                name: '',
                url: ''
            }
        });
    }

    // Effect 👇
    readonly getHero = this.effect((heroId$: Observable<string>) => {
        return heroId$.pipe(
            switchMap((id) => this.heroService.getHeroDetails(id).pipe(
                //👇 Act on the result within inner pipe.
                tapResponse(
                    (hero: HeroProfile) => this.updateHero(hero),
                    (error: HttpErrorResponse) => this.logError(error),
                ),
            )),
        )
    });

    // reducer/action 👇
    readonly updateHero = this.updater((state, hero: HeroProfile) => ({
        hero: hero,
    }));

    // Selector 👇
    selectedHero() {
        return this.select((state) => state.hero);
    }

    private logError(error: any) {
        console.log(error);
    }
}