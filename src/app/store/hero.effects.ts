import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HeroService } from '../hero.service';
import * as heroActions from './hero.actions';

@Injectable()
export class HeroEffects {
    getHeroes$ = createEffect(() => this.actions$.pipe(
        ofType(heroActions.getHeroes),
        mergeMap(action => this.service.getHeroesList().pipe(
            map(heroes => heroActions.getHeroesSuccess({ heroes: heroes })),
            catchError(err => of(heroActions.getHeroesFailed))
        ))
    ));

    constructor(
        private actions$: Actions,
        private service: HeroService
    ) { }
}