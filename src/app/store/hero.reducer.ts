import { createReducer, on } from '@ngrx/store';
import { HeroProfile } from '../heroes/heroes.component';
import * as actions from './hero.actions';

export interface GlobalState {
  heroes: HeroProfile[]
}

function guidGenerator(): string {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function removeById(list: HeroProfile[], id: string): HeroProfile[] {
  const index = list.findIndex(hero => hero.id === id);
  const result = list.splice(index, 1);

  return result || [];
}

const defaultAvatar = 'https://i.pinimg.com/564x/95/76/57/9576572d657f37978aede9fca38e3da0.jpg';

export const initialState: GlobalState = {
  heroes: []
};

export const heroReducer = createReducer(
  initialState,
  on(
    actions.createHero, (state, { hero }) => ({
      ...state,
      heroes: [...state.heroes, {
        ...hero,
        id: guidGenerator(),
        ...((hero?.url && hero?.url !== '') ? { url: hero?.url } : { url: defaultAvatar })
      }]
    })
  ),
  on(
    actions.deleteHero,
    (state, { id }) => ({
      ...state,
      heroes: removeById(state.heroes, id)
    })
  )
);
