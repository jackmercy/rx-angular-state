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

export const createHeroSuccess = createAction(
    '[CREATE] Heroes list SUCCESS',
    props<{ response: any }>()
);

export const createHeroFailed = createAction(
    '[CREATE] Heroes list SUCCESS'
);

export const getHeroDetails = createAction(
    '[GET] Hero details',
    props<{ id: string }>()
);

export const getHeroDetailsSuccess = createAction(
    '[GET] Hero details SUCCESS',
    props<{ selectedHero: HeroProfile }>()
);

export const deleteHero = createAction(
    '[DELETE] Hero',
    props<{ id: string }>()
);

export const deleteHeroSuccess = createAction(
    '[DELETE] Hero SUCCESS'
);
