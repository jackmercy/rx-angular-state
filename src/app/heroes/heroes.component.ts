import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { HeroService } from '../hero.service';
import * as heroActions from '../store/hero.actions';
import { HeroState } from '../store/hero.reducer';
import { selectHeroes } from '../store/hero.selectors';

export interface HeroProfile {
  id: string;
  url: string;
  name: string;
  age?: number;
}

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  public heroForm: FormGroup;
  public heroes$: Observable<HeroProfile[]>;

  constructor(
    private store: Store<HeroState>,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private changeDef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.buildHeroForm();
    this.spinner.show('list');
    this.store.dispatch(heroActions.getHeroes());
    this.heroes$ = this.store.pipe(select(selectHeroes));
    this.changeDef.markForCheck();
  }

  createHero(): void {
    this.spinner.show('create');
    const data = this.heroForm.value;
    this.store.dispatch(heroActions.createHero({ hero: data }));
    this.heroForm.reset();
    this.changeDef.markForCheck();
  }

  deleteHero(id: string): void {
    this.spinner.show('list');
    this.store.dispatch(heroActions.deleteHero({ id: id }));
    this.changeDef.markForCheck();
  }

  buildHeroForm(): void {
    this.heroForm = this.formBuilder.group({
      url: this.formBuilder.control(''),
      name: this.formBuilder.control(''),
      age: this.formBuilder.control(''),
    });
  }

  goToHeroDetails(id: string): void {
    this.router.navigate(['./detail', id]);
    this.changeDef.markForCheck();
  }
}
