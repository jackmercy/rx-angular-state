import { createReducer, on } from '@ngrx/store';
import { HeroProfile } from '../heroes/heroes.component';
import * as actions from './hero.actions';

export interface AppState {};

export interface HeroState {
  heroes: HeroProfile[];
  selectedHero: HeroProfile;
}

export const initialState: HeroState = {
  heroes: [],
  selectedHero: {
    id: '',
    name: '',
    url: ''
  }
};

export const heroReducer = createReducer(
  initialState,
  on(
    actions.getHeroesSuccess,
    (state, { heroes }) => ({
      ...state,
      heroes: [...heroes]
    })
  ),
  on(
    actions.getHeroDetailsSuccess,
    (state, { selectedHero }) => ({
      ...state,
      selectedHero: selectedHero
    })
  )
);
