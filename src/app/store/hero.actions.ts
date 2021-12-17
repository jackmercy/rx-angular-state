import { createAction, props } from '@ngrx/store';
import { HeroProfile } from '../heroes/heroes.component';

export const getHeroes = createAction(
    '[GET] Heroes list'
);

export const getHeroesSuccess = createAction(
    '[GET] Heroes list SUCCESS',
    props<{ heroes: HeroProfile[] }>()
);

export const getHeroesFailed = createAction(
    '[GET] Heroes list FAILED'
);


export const createHero = createAction(
    '[CREATE] Heroes list',
    props<{ hero: HeroProfile }>()
);

export const getHeroDetails = createAction(
    '[GET] Hero details',
    props<{ id: string }>()
);

export const deleteHero = createAction(
    '[DELETE] Hero',
    props<{ id: string }>()
);