import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HeroState } from './hero.reducer';

export interface AppState {
    app: HeroState;
}

export const selectHeroState = createFeatureSelector<HeroState>(
   'app'
);

export const selectHeroes = createSelector(
    selectHeroState,
    (state: HeroState) => state.heroes
);

export const selectHeroDetails = createSelector(
    selectHeroState,
    (state: HeroState) => state.selectedHero
);
