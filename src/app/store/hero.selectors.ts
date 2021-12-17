import { createSelector } from '@ngrx/store';
import { GlobalState } from './hero.reducer';


export const selectState = (state: GlobalState) => state;


export const selectHeroes = createSelector(
    selectState,
    (state: GlobalState) => state.heroes
);
