import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, switchMap } from 'rxjs';
import { HeroService } from '../hero.service';
import { HeroProfile } from '../heroes/heroes.component';

export interface HeroesState {
    heroes: HeroProfile[];
}

@Injectable()
export class HeroesComponentStore extends ComponentStore<HeroesState> {
    constructor(
        private readonly heroService: HeroService,
        private spinner: NgxSpinnerService
    ) {
        super({ heroes: [] });
    }

    // Effect 👇
    readonly getHeroes = this.effect(event$ => event$.pipe(
        switchMap(() => this.heroService.getHeroesList().pipe(
            //👇 Act on the result within inner pipe.
            tapResponse(
                (heroes: HeroProfile[]) => {
                    this.spinner.hide('list');
                    return this.updateHeroes(heroes);
                },
                (error: HttpErrorResponse) => this.logError(error),
            ),
        )),
    ));

    readonly createHero = this.effect((heroData$: Observable<HeroProfile>) => {
        return heroData$.pipe(
            switchMap((heroData) => this.heroService.createHero(heroData).pipe(
                //👇 Act on the result within inner pipe.
                tapResponse(
                    (resp: any) => {
                        this.spinner.hide('create');
                        return this.getHeroes();
                    },
                    (error: HttpErrorResponse) => this.logError(error),
                ),
            )),
        )
    });

    readonly deleteHero = this.effect((id$: Observable<string>) => {
        return id$.pipe(
            switchMap((id) => this.heroService.deleteHero(id).pipe(
                //👇 Act on the result within inner pipe.
                tapResponse(
                    (resp: any) => {
                        this.spinner.hide('list');
                        return this.getHeroes();
                    },
                    (error: HttpErrorResponse) => this.logError(error),
                ),
            )),
        )
    });
    

    // reducer/action 👇
    readonly updateHeroes = this.updater((state, heroes: HeroProfile[]) => ({
        heroes: heroes,
    }));

    // Selector 👇
    selectHeroes() {
        return this.select((state) => state.heroes);
    }

    private logError(error: any) {
        console.log(error);
    }
}