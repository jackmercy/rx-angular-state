import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HeroService } from '../hero.service';
import * as heroActions from './hero.actions';

@Injectable()
export class HeroEffects {
    getHeroes$ = createEffect(() => this.actions$.pipe(
        ofType(heroActions.getHeroes),
        mergeMap(action => this.service.getHeroesList().pipe(
            map(heroes => {
                this.spinner.hide('list');
                return heroActions.getHeroesSuccess({ heroes: heroes });
            }),
            catchError(err => of(heroActions.getHeroesFailed))
        ))
    ));

    createHero$ = createEffect(() => this.actions$.pipe(
        ofType(heroActions.createHero),
        mergeMap(action => this.service.createHero(action.hero).pipe(
            map(resp => {
                if (resp) {
                    this.spinner.hide('create');
                    return heroActions.createHeroSuccess(resp);
                }
                return heroActions.createHeroFailed();
            }),
            catchError(err => of(heroActions.createHeroFailed))
        ))
    ));

    loadHeroAfterCreated$ = createEffect(() =>
        this.actions$.pipe(
            ofType(heroActions.createHeroSuccess),
            map(() => heroActions.getHeroes())
        )
    );

    deleteHero$ = createEffect(() => this.actions$.pipe(
        ofType(heroActions.deleteHero),
        mergeMap(action => this.service.deleteHero(action.id).pipe(
            map(resp => {
                this.spinner.hide('list');
                return heroActions.deleteHeroSuccess();
            })
        ))
        // catchError return failed action
    ));

    loadHeroAfterDeleted$ = createEffect(() =>
        this.actions$.pipe(
            ofType(heroActions.deleteHeroSuccess),
            map(() => heroActions.getHeroes())
        )
    );

    constructor(
        private actions$: Actions,
        private service: HeroService,
        private spinner: NgxSpinnerService
    ) { }
}